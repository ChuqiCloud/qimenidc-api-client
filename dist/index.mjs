class ApiError extends Error {
  url;
  status;
  statusText;
  body;
  request;
  constructor(request, response, message) {
    super(message);
    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request;
  }
}

class CancelError extends Error {
  constructor(message) {
    super(message);
    this.name = "CancelError";
  }
  get isCancelled() {
    return true;
  }
}
class CancelablePromise {
  #isResolved;
  #isRejected;
  #isCancelled;
  #cancelHandlers;
  #promise;
  #resolve;
  #reject;
  constructor(executor) {
    this.#isResolved = false;
    this.#isRejected = false;
    this.#isCancelled = false;
    this.#cancelHandlers = [];
    this.#promise = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
      const onResolve = (value) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isResolved = true;
        if (this.#resolve) this.#resolve(value);
      };
      const onReject = (reason) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#isRejected = true;
        if (this.#reject) this.#reject(reason);
      };
      const onCancel = (cancelHandler) => {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
          return;
        }
        this.#cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, "isResolved", {
        get: () => this.#isResolved
      });
      Object.defineProperty(onCancel, "isRejected", {
        get: () => this.#isRejected
      });
      Object.defineProperty(onCancel, "isCancelled", {
        get: () => this.#isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(onFulfilled, onRejected) {
    return this.#promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this.#promise.catch(onRejected);
  }
  finally(onFinally) {
    return this.#promise.finally(onFinally);
  }
  cancel() {
    if (this.#isResolved || this.#isRejected || this.#isCancelled) {
      return;
    }
    this.#isCancelled = true;
    if (this.#cancelHandlers.length) {
      try {
        for (const cancelHandler of this.#cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn("Cancellation threw an error", error);
        return;
      }
    }
    this.#cancelHandlers.length = 0;
    if (this.#reject) this.#reject(new CancelError("Request aborted"));
  }
  get isCancelled() {
    return this.#isCancelled;
  }
}

const OpenAPI = {
  BASE: "",
  VERSION: "1.0.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
};

var ForwardRule;
((ForwardRule2) => {
  ((protocol2) => {
    protocol2["TCP"] = "tcp";
    protocol2["UDP"] = "udp";
  })(ForwardRule2.protocol || (ForwardRule2.protocol = {}));
})(ForwardRule || (ForwardRule = {}));

const isDefined = (value) => {
  return value !== void 0 && value !== null;
};
const isString = (value) => {
  return typeof value === "string";
};
const isStringWithValue = (value) => {
  return isString(value) && value !== "";
};
const isBlob = (value) => {
  return typeof value === "object" && typeof value.type === "string" && typeof value.stream === "function" && typeof value.arrayBuffer === "function" && typeof value.constructor === "function" && typeof value.constructor.name === "string" && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
const isFormData = (value) => {
  return value instanceof FormData;
};
const base64 = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};
const getQueryString = (params) => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};
const getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace("{api-version}", config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    if (options.path?.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
const getFormData = (options) => {
  if (options.formData) {
    const formData = new FormData();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return void 0;
};
const resolve = async (options, resolver) => {
  if (typeof resolver === "function") {
    return resolver(options);
  }
  return resolver;
};
const getHeaders = async (config, options) => {
  const [token, username, password, additionalHeaders] = await Promise.all([
    resolve(options, config.TOKEN),
    resolve(options, config.USERNAME),
    resolve(options, config.PASSWORD),
    resolve(options, config.HEADERS)
  ]);
  const headers = Object.entries({
    Accept: "application/json",
    ...additionalHeaders,
    ...options.headers
  }).filter(([_, value]) => isDefined(value)).reduce((headers2, [key, value]) => ({
    ...headers2,
    [key]: String(value)
  }), {});
  if (isStringWithValue(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers["Authorization"] = `Basic ${credentials}`;
  }
  if (options.body !== void 0) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }
  return new Headers(headers);
};
const getRequestBody = (options) => {
  if (options.body !== void 0) {
    if (options.mediaType?.includes("/json")) {
      return JSON.stringify(options.body);
    } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body;
    } else {
      return JSON.stringify(options.body);
    }
  }
  return void 0;
};
const sendRequest = async (config, options, url, body, formData, headers, onCancel) => {
  const controller = new AbortController();
  const request2 = {
    headers,
    body: body ?? formData,
    method: options.method,
    signal: controller.signal
  };
  if (config.WITH_CREDENTIALS) {
    request2.credentials = config.CREDENTIALS;
  }
  onCancel(() => controller.abort());
  return await fetch(url, request2);
};
const getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return void 0;
};
const getResponseBody = async (response) => {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType) {
        const jsonTypes = ["application/json", "application/problem+json"];
        const isJSON = jsonTypes.some((type) => contentType.toLowerCase().startsWith(type));
        if (isJSON) {
          return await response.json();
        } else {
          return await response.text();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return void 0;
};
const catchErrorCodes = (options, result) => {
  const errors = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors
  };
  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }
  if (!result.ok) {
    const errorStatus = result.status ?? "unknown";
    const errorStatusText = result.statusText ?? "unknown";
    const errorBody = (() => {
      try {
        return JSON.stringify(result.body, null, 2);
      } catch (e) {
        return void 0;
      }
    })();
    throw new ApiError(
      options,
      result,
      `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
    );
  }
};
const request = (config, options) => {
  return new CancelablePromise(async (resolve2, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options);
      if (!onCancel.isCancelled) {
        const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
        const responseBody = await getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody
        };
        catchErrorCodes(options, result);
        resolve2(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};

class Service {
  /**
   * 登陆接口
   * 登陆接口，
   * @param adminPath 后台路径
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postLoginDo(adminPath, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/loginDo",
      path: {
        "adminPath": adminPath
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 增加地区
   * 增加地区
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddArea(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addArea",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除地区
   * 删除地区
   * @param adminPath
   * @param id 删除地区的id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteArea(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteArea/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 修改地区
   * 修改地区
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateArea(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateArea",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页查询地区
   * 分页查询地区
   * @param adminPath
   * @param page
   * @param limit
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetAreaList(adminPath, page, limit, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getAreaList",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "limit": limit
      }
    });
  }
  /**
   * 查询指定id的地区
   * 查询指定id的地区
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetArea(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getArea",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "id": id
      }
    });
  }
  /**
   * 添加某节点到指定地区
   * 添加某节点到指定地区
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putAddNodeToArea(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/addNodeToArea",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取指定地区的节点列表
   * 获取指定地区的节点列表
   * @param adminPath
   * @param area 地区分类ID
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetNodeListByArea(adminPath, area, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getNodeListByArea",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "area": area,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取指定父级地区的子地区列表
   * 获取指定父级地区的子地区列表
   * @param adminPath
   * @param parent 父级ID
   * @param page 页码
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetAreaListByParent(adminPath, parent, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getAreaListByParent",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "parent": parent,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 分页查询父级（一级）地区
   * 分页查询纯父级（一级）地区
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetAreaListByParentIsNull(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getAreaListByParentIsNull",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取节点网卡信息
   * 获取节点网卡信息
   * @param adminPath
   * @param nodeId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetPveNodeNetworkInfo(adminPath, nodeId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getPveNodeNetworkInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "nodeId": nodeId
      }
    });
  }
  /**
   * 获取节点网卡配置文件信息
   * 获取节点网卡配置文件信息
   * @param adminPath
   * @param nodeId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetPveNodeInterfaces(adminPath, nodeId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getPveNodeInterfaces",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "nodeId": nodeId
      }
    });
  }
  /**
   * 创建指定节点虚拟网卡
   * 创建指定节点虚拟网卡
   * @param adminPath
   * @param nodeId 节点id
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postCreatePveNodeInterface(adminPath, nodeId, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/createPveNodeInterface/{nodeId}",
      path: {
        "adminPath": adminPath,
        "nodeId": nodeId
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 查询单个节点状态
   * 查询单个节点状态
   * @param adminPath
   * @param nodeId 节点ID
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetNodeInfoByOne(adminPath, nodeId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getNodeInfoByOne",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "nodeId": nodeId
      }
    });
  }
  /**
   * 获取指定节点负载信息
   * 获取指定节点负载信息
   * @param adminPath
   * @param nodeId 节点id
   * @param timeframe 采样时间 [hour, day, week, month, year] 默认为hour
   * @param cf 采样方式 [AVERAGE, MAX] 默认为AVERAGE
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetNodeLoadAvg(adminPath, nodeId, timeframe, cf, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getNodeLoadAvg",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "nodeId": nodeId,
        "timeframe": timeframe,
        "cf": cf
      }
    });
  }
  /**
   * 获取节点总数
   * 获取节点总数
   * @param adminPath
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetNodeCount(adminPath, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getNodeCount",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 添加PVE主控节点
   * 添加PVE主控集群节点
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAdminInsertNodeMaster(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/admin/insertNodeMaster",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页获取集群节点列表
   * 分页获取集群节点列表
   * @param adminPath
   * @param page 页码
   * @param size 每页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectNodeByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectNodeByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 修改集群节点信息
   * 修改集群节点信息
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateNodeInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateNodeInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除指定ID节点
   * 删除指定ID节点
   * @param adminPath
   * @param nodeId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteNodeById(adminPath, nodeId, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteNodeById",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "nodeId": nodeId
      }
    });
  }
  /**
   * 添加超管账号
   * 添加超管账号
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postRegisterDo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/registerDo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页查询超管账号
   * 分页查询超管账号
   * @param adminPath 后台路径
   * @param page 页码
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetSysuser(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getSysuser",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 修改超管账号接口
   * 修改超管账号接口
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postUpdateSysuser(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/updateSysuser",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 根据uuid查询超管
   * 根据uuid查询超管
   * @param adminPath
   * @param uuid
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetSysuserByUuid(adminPath, uuid, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getSysuserByUuid",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "uuid": uuid
      }
    });
  }
  /**
   * 删除超管账号
   * 删除超管账号
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteSysUserById(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteSysUserById/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 增加配置模板
   * 增加配置模板
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddConfiguretemplate(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addConfiguretemplate",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除配置模板
   * 删除配置模板
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteConfiguretemplate(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteConfiguretemplate/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 修改配置模板
   * 修改配置模板
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateConfiguretemplate(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateConfiguretemplate",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页查询配置模板
   * 分页查询配置模板
   * @param adminPath
   * @param page 页码
   * @param limit 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetConfiguretemplateByPage(adminPath, page, limit, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getConfiguretemplateByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "limit": limit
      }
    });
  }
  /**
   * 电源状态操作
   * 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
   * @param adminPath
   * @param hostId 数据库中虚拟机ID（非vmid）
   * @param action action类型有start、stop、reboot、shutdown
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putPower(adminPath, hostId, action, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/power/{hostId}/{action}",
      path: {
        "adminPath": adminPath,
        "hostId": hostId,
        "action": action
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 重装虚拟机系统
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putReinstall(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/reinstall",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除虚拟机
   * @param adminPath
   * @param hostId 非虚拟机vmId，为ID
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDelete(adminPath, hostId, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/delete/{hostId}",
      path: {
        "adminPath": adminPath,
        "hostId": hostId
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 创建虚拟机
   * 创建虚拟机
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postCreateVm(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/createVm",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页获取实例信息
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 带参数分页获取实例信息
   * @param adminPath
   * @param page
   * @param size
   * @param param
   * @param value
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmByParam(adminPath, page, size, param, value, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmByParam",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size,
        "param": param,
        "value": value
      }
    });
  }
  /**
   * 获取虚拟机主机信息
   * @param adminPath
   * @param hostId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmHostInfo(adminPath, hostId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmHostInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId
      }
    });
  }
  /**
   * 获取虚拟机历史负载
   * @param adminPath
   * @param hostId 虚拟机id
   * @param timeframe 时间范围[hour,day,week,month,year]
   * @param cf 数据类型[AVERAGE,MAX]
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmHostRrdData(adminPath, hostId, timeframe, cf, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmHostRrdData",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId,
        "timeframe": timeframe,
        "cf": cf
      }
    });
  }
  /**
   * 获取指定虚拟机的vnc地址
   * 获取指定虚拟机的vnc地址
   * @param adminPath
   * @param node
   * @param hostId 可以为vmid
   * @param page 页数
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVnc(adminPath, node, hostId, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/{node}/getVnc",
      path: {
        "adminPath": adminPath,
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 以降序排列获取虚拟机分页列表
   * 获取虚拟机分页列表,根据创建时间降序排列
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmByPageOrderByCreateTime(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmByPageOrderByCreateTime",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 分页获取指定状态的虚拟机列表
   * 分页获取指定状态的虚拟机列表
   * @param adminPath
   * @param status 0为开机，详细查看电源管理接口
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmByStatus(adminPath, status, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmByStatus",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "status": status,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取指定状态的虚拟机总数
   * 获取指定状态的虚拟机总数
   * @param adminPath
   * @param status 0为开机，详细查看电源管理接口
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmCountByStatus(adminPath, status, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmCountByStatus",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "status": status
      }
    });
  }
  /**
   * 获取实例总数
   * 获取虚拟机总数
   * @param adminPath
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmCount(adminPath, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmCount",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 获取被控通讯密钥
   * 获取被控通讯密钥
   * @param adminPath
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetControlledSecretKey(adminPath, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getControlledSecretKey",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 获取全局虚拟机默认系统盘大小
   * 获取全局虚拟机默认系统盘大小
   * @param adminPath
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetVmDefaultDiskSize(adminPath, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getVmDefaultDiskSize",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 修改全局虚拟机默认系统盘大小
   * 修改全局虚拟机默认系统盘大小，该接口支持POST,PUT请求方法
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postUpdateVmDefaultDiskSize(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/updateVmDefaultDiskSize",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取全部配置
   * 获取全部配置
   * @param adminPath
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetAllConfig(adminPath, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getAllConfig",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 修改系统配置
   * 修改系统配置
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateConfig(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateConfig",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 新增smbios信息模型
   * 新增smbios信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddSmbiosInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addSmbiosInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除smbios信息模型
   * 删除smbios信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteSmbiosInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteSmbiosInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 修改smbios信息模型
   * 修改smbios信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateSmbiosInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateSmbiosInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 查询smbios信息模型
   * 查询smbios信息模型
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetSmbiosInfo(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getSmbiosInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "id": id
      }
    });
  }
  /**
   * 分页查询smbios信息模型
   * 分页查询smbios信息模型
   * @param adminPath
   * @param page
   * @param limit
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetSmbiosInfoList(adminPath, page, limit, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getSmbiosInfoList",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "limit": limit
      }
    });
  }
  /**
   * 添加模型组
   * 添加模型组
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddModelGroup(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addModelGroup",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除模型组
   * 删除模型组
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteModelGroup(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteModelGroup",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 修改模型组
   * 修改模型组
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateModelGroup(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateModelGroup",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 查询模型组
   * 查询模型组
   * @param adminPath
   * @param modelGroupId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetModelGroup(adminPath, modelGroupId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getModelGroup",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "modelGroupId": modelGroupId
      }
    });
  }
  /**
   * 分页查询模型组
   * 分页查询模型组
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getGetModelGroupPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/getModelGroupPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取CPU类型
   * 获取CPU类型
   * @returns any
   * @throws ApiError
   */
  static getApiCommonCpuType() {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/common/cpuType"
    });
  }
  /**
   * 获取OS类型
   * 获取OS类型
   * @returns any
   * @throws ApiError
   */
  static getApiCommonOsType() {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/common/osType"
    });
  }
  /**
   * 获取OS架构列表
   * 获取OS架构列表
   * @returns any
   * @throws ApiError
   */
  static getApiCommonOsArch() {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/common/osArch"
    });
  }
  /**
   * 获取系统版本信息
   * 获取系统版本信息
   * @returns any
   * @throws ApiError
   */
  static getApiCommonVersion() {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/common/version"
    });
  }
  /**
   * 状态查询
   * 获取状态
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getStatus(authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/status",
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 获取版本号
   * 获取版本号
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getVersion(authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/version",
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 获取指定目录文件列表
   * 获取指定目录文件列表
   * @param path
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getPathFile(path, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/pathFile",
      headers: {
        "Authorization": authorization
      },
      query: {
        "path": path
      }
    });
  }
  /**
   * 下载文件到指定目录
   * 下载文件到指定目录
   * @param url
   * @param path
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getWget(url, path, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/wget",
      headers: {
        "Authorization": authorization
      },
      query: {
        "url": url,
        "path": path
      }
    });
  }
  /**
   * 重置虚拟机密码
   * 重置虚拟机密码
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postChangePassword(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/changePassword",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除指定目录下的指定文件
   * 删除指定目录下的指定文件
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postDeleteFile(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/deleteFile",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 更新程序
   * 更新程序
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static postUpdate(authorization) {
    return request(OpenAPI, {
      method: "POST",
      url: "/update",
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 导入磁盘到虚拟机
   * 导入磁盘到虚拟机
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postImportDisk(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/importDisk",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 读取指定目录下文件的内容
   * 读取指定目录下文件的内容
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postReadFile(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/readFile",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 创建VNC服务
   * 创建VNC服务
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postVnc(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/vnc",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 停止指定vnc服务
   * 停止指定vnc服务
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postVncStop(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/vnc/stop",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 导入vnc配置信息
   * 导入vnc配置信息
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postVncImport(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/vnc/import",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 重启网桥
   * 重启网络配置
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static postRestartNetwork(authorization) {
    return request(OpenAPI, {
      method: "POST",
      url: "/restartNetwork",
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 添加端口转发规则
   * 添加端口转发规则
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postNatAdd(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/nat/add",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除端口转发规则
   * 删除端口转发规则
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postNatDelete(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/nat/delete",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取端口转发规则
   * 获取端口转发规则
   * @param page
   * @param size
   * @param vm
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getNatGetVm(page, size, vm, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/nat/getVm/{page}/{size}",
      path: {
        "page": page,
        "size": size
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "vm": vm
      }
    });
  }
  /**
   * 添加端口转发接口
   * 添加端口转发规则
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postNatAddBridge(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/nat/addBridge",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
}

class ApiService {
  /**
   * 添加API key
   * 新增api key，该appkey只会本次显示，后续查询将不显示
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postInsertApiKey(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/insertApiKey",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页获取API信息
   * 分页获取API信息
   * @param adminPath 后台路径
   * @param page 页码
   * @param size 每页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectApiByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectApiByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 删除指定ID的API key
   * 删除指定ID的API key，可以post请求
   * @param adminPath 后台路径
   * @param id api id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteApi(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteApi",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "id": id
      }
    });
  }
  /**
   * 停用指定API
   * 停用指定API
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static putDisableApi(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/disableApi/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 启用指定API
   * 启用指定API
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static putEnableApi(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/enableApi/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 修改指定虚拟机的VNC密码
   * 修改指定虚拟机的VNC密码
   * @param node
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putApiV1UpdateVncPassword(node, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/{node}/updateVncPassword",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 创建虚拟机
   * 创建虚拟机
   * @param nodeType 虚拟化平台，目前只有pve
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postApiV1CerateVm(nodeType, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/api/v1/{nodeType}/cerateVM",
      path: {
        "nodeType": nodeType
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 虚拟机电源状态管理
   * 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
   * @param nodeType 虚拟化平台，目前只有pve
   * @param hostId 数据库中虚拟机ID（非vmid）
   * @param action action类型有start、stop、reboot、shutdown
   * @returns any
   * @throws ApiError
   */
  static putApiV1Power(nodeType, hostId, action) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/{nodeType}/power/{hostId}/{action}",
      path: {
        "nodeType": nodeType,
        "hostId": hostId,
        "action": action
      }
    });
  }
  /**
   * 重装系统
   * 重装系统
   * @param nodeType
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putApiV1Reinstall(nodeType, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/{nodeType}/reinstall",
      path: {
        "nodeType": nodeType
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除虚拟机
   * 删除虚拟机
   * @param nodeType
   * @param hostId 这里不能为vmId
   * @returns any
   * @throws ApiError
   */
  static deleteApiV1Delete(nodeType, hostId) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/{nodeType}/delete/{hostId}",
      path: {
        "nodeType": nodeType,
        "hostId": hostId
      }
    });
  }
  /**
   * 修改虚拟机密码
   * 修改虚拟机密码
   * @param nodeType
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putApiV1UpdateVmConfigRestPassword(nodeType, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/{nodeType}/updateVmConfig/restPassword",
      path: {
        "nodeType": nodeType
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 续期
   * 续期
   * @param nodeType
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putApiV1UpdateVmConfigRenewal(nodeType, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/{nodeType}/updateVmConfig/renewal",
      path: {
        "nodeType": nodeType
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取指定虚拟机数据
   * current字段为当前运行实时监控数据，rrddata为历史数据，历史数据默认为一天
   * @param nodeType 虚拟化平台，目前只有pve
   * @param hostId 虚拟机ID（可以vmid或者键ID）
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmInfo(nodeType, hostId) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{nodeType}/getVmInfo",
      path: {
        "nodeType": nodeType
      },
      query: {
        "hostId": hostId
      }
    });
  }
  /**
   * 获取指定虚拟机的vnc地址
   * 获取指定虚拟机的vnc地址
   * @param node
   * @param hostId 可以为vmid
   * @param page 页数
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVnc(node, hostId, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVnc",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 通讯测试
   * 通讯测试
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1Status(authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/status",
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 分页获取实例信息
   * 分页查询实例信息
   * @param node
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmByPage(node, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmByPage",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 带参数分页获取实例信息
   * @param node
   * @param page
   * @param size
   * @param param
   * @param value
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmByParam(node, page, size, param, value, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmByParam",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size,
        "param": param,
        "value": value
      }
    });
  }
  /**
   * 以降序排列获取虚拟机分页列表
   * 获取虚拟机分页列表,根据创建时间降序排列
   * @param node
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmByPageOrderByCreateTime(node, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmByPageOrderByCreateTime",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取实例总数
   * 获取虚拟机总数
   * @param node
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmCount(node, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmCount",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 获取虚拟机历史负载
   * @param node
   * @param hostId 虚拟机id
   * @param timeframe 时间范围[hour,day,week,month,year]
   * @param cf 数据类型[AVERAGE,MAX]
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmHostRrdData(node, hostId, timeframe, cf, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmHostRrdData",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId,
        "timeframe": timeframe,
        "cf": cf
      }
    });
  }
  /**
   * 分页获取指定状态的虚拟机列表
   * 分页获取指定状态的虚拟机列表
   * @param node
   * @param status 0为开机，详细查看电源管理接口
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmByStatus(node, status, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmByStatus",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "status": status,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 获取指定状态的虚拟机总数
   * 获取指定状态的虚拟机总数
   * @param node
   * @param status 0为开机，详细查看电源管理接口
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1GetVmCountByStatus(node, status, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{node}/getVmCountByStatus",
      path: {
        "node": node
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "status": status
      }
    });
  }
}

class ApiNatService {
  /**
   * 添加虚拟机NAT规则
   * @param nodeType
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postApiV1NatAdd(nodeType, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/api/v1/{nodeType}/nat/add",
      path: {
        "nodeType": nodeType
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除虚拟机NAT规则
   * @param nodeType
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postApiV1NatDel(nodeType, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/api/v1/{nodeType}/nat/del",
      path: {
        "nodeType": nodeType
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取虚拟机NAT规则
   * @param nodeType
   * @param page
   * @param size
   * @param hostId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1NatGetVm(nodeType, page, size, hostId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{nodeType}/nat/getVm",
      path: {
        "nodeType": nodeType
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size,
        "hostId": hostId
      }
    });
  }
  /**
   * 获取虚拟机NAT相关信息
   * @param nodeType
   * @param hostId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getApiV1PveNatGetInfo(nodeType, hostId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/api/v1/{nodeType}/pve/nat/getInfo",
      path: {
        "nodeType": nodeType
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId
      }
    });
  }
}

class CpuService {
  /**
   * 新增cpu信息模型
   * 新增cpu信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddCpuInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addCpuInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除cpu信息模型
   * 删除cpu信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteCpuInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteCpuInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 修改cpu信息模型
   * 修改cpu信息模型
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateCpuInfo(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateCpuInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 查询cpu信息模型
   * 查询cpu信息模型
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectCpuInfo(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectCpuInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "id": id
      }
    });
  }
  /**
   * 分页查询cpu信息模型
   * 分页查询cpu信息模型
   * @param adminPath
   * @param page
   * @param limit
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectCpuInfoPage(adminPath, page, limit, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectCpuInfoPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "limit": limit
      }
    });
  }
}

class IpService {
  /**
   * 根据掩码位批量插入IP
   * 根据掩码位批量插入IP到IP池，并创建IP池
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postInsertIpPoolByMask(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/insertIpPoolByMask",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 根据IP范围批量插入IP
   * 根据IP范围批量插入IP到已创建的IP池
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postInsertIpPoolByRange(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/insertIpPoolByRange",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页查询IP池列表
   * 分页查询IP池列表
   * @param adminPath 后台路径
   * @param page 页码
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectIpPoolList(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectIpPoolList",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 查询指定IP池下的IP列表
   * 查询指定IP池下的IP列表
   * @param adminPath 后台路径
   * @param poolid IP池ID
   * @param page 页码
   * @param size 页数量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectIpListByPoolId(adminPath, poolid, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectIpListByPoolId",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "poolid": poolid,
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 更新IP池信息
   * 更新IP池信息，支持post请求
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateIpPool(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateIpPool",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 修改IP信息
   * 修改IP信息，可多个，支持post请求
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateIp(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateIp",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除指定IP池
   * 删除指定IP池
   * @param adminPath
   * @param poolId ip池ID
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteIpPool(adminPath, poolId, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteIpPool/{poolId}",
      path: {
        "adminPath": adminPath,
        "poolId": poolId
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
}

class NatService {
  /**
   * PVE主控创建NAT
   * 添加PVE主控集群节点
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAdminAddNodeMasterNat(authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/admin/addNodeMasterNat",
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 添加虚拟机NAT规则
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postNatAdd(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/nat/add",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除虚拟机NAT规则
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postNatDel(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/nat/del",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 获取虚拟机NAT规则
   * @param adminPath
   * @param page
   * @param size
   * @param hostId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getNatGetVm(adminPath, page, size, hostId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/nat/getVm",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size,
        "hostId": hostId
      }
    });
  }
  /**
   * 获取虚拟机NAT相关信息
   * @param adminPath
   * @param hostId
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getNatGetInfo(adminPath, hostId, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/nat/getInfo",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "hostId": hostId
      }
    });
  }
}

class OsService {
  /**
   * 获取在线系统列表
   * 获取在线系统列表
   * @param adminPath 后台路径
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectOsByOnline(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectOsByOnline",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 激活在线OS
   * 激活在线OS到数据库
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postActiveOsByOnline(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/activeOsByOnline",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 手动新增OS
   * 新增OS
   * @param adminPath 后台路径
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postInsertOs(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/insertOs",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页获取已添加OS
   * 分页获取已添加OS
   * @param adminPath
   * @param page 页码
   * @param size 每页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectOsByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectOsByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
  /**
   * 分页带条件获取已添加os
   * 分页带条件获取已添加os，该接口为模糊匹配
   * @param adminPath
   * @param param 匹配参数
   * @param value 匹配值
   * @param page 页码
   * @param size 每页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectOsByPageAndCondition(adminPath, param, value, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectOsByPageAndCondition",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size,
        "param": param,
        "value": value
      }
    });
  }
  /**
   * 下载镜像
   * 下载指定id镜像到指定节点
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postDownloadOs(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/downloadOs",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除os
   * 删除os
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteOs(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteOs",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 修改os
   * 修改os
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateOs(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateOs",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
}

class SdnService {
  /**
   * 添加sdn区域
   * 添加sdn区域
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postSdnAddZone(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/sdn/addZone",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 根据id删除sdn区域
   * 根据id删除sdn区域
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteSdnDeleteZoneById(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/sdn/deleteZoneById/{id}",
      path: {
        "adminPath": adminPath,
        "id": id
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 根据标识zone删除sdn区域
   * 根据标识zone删除sdn区域
   * @param adminPath
   * @param zone
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteSdnDeleteZoneByZone(adminPath, zone, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/sdn/deleteZoneByZone/{zone}",
      path: {
        "adminPath": adminPath,
        "zone": zone
      },
      headers: {
        "Authorization": authorization
      }
    });
  }
  /**
   * 查询sdn区域列表
   * 查询sdn区域列表
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSdnGetZonesByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/sdn/getZonesByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
}

class SdnVnetsService {
  /**
   * 添加vnet区域
   * 添加vnet区域
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postSdnAddVnet(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/sdn/addVnet",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 查询vnet列表
   * 查询vnet列表
   * @param adminPath
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSdnGetVnetsByPage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/sdn/getVnetsByPage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
}

class SdnVnetsSubnetsService {
  /**
   * 添加子网
   * 添加子网
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postSdnAddSubnet(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/sdn/addSubnet",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 根据vnet查询subnet列表
   * 根据vnet查询subnet列表
   * @param adminPath
   * @param vnet vnet 名
   * @param page
   * @param size
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSdnGetSubnets(adminPath, vnet, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/sdn/{vnet}/getSubnets",
      path: {
        "adminPath": adminPath,
        "vnet": vnet
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
}

class VncService {
  /**
   * 增加vnc控制器节点
   * 增加vnc控制器节点
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static postAddVncNode(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/{adminPath}/addVncNode",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 删除vnc控制器节点
   * 删除vnc控制器节点
   * @param adminPath
   * @param id
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static deleteDeleteVncNode(adminPath, id, authorization) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/{adminPath}/deleteVncNode",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "id": id
      }
    });
  }
  /**
   * 修改vnc控制器节点
   * 修改vnc控制器节点
   * @param adminPath
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  static putUpdateVncNode(adminPath, authorization, requestBody) {
    return request(OpenAPI, {
      method: "PUT",
      url: "/{adminPath}/updateVncNode",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * 分页查询vnc控制器节点
   * 分页查询vnc控制器节点
   * @param adminPath
   * @param page 页码
   * @param size 页数据量
   * @param authorization
   * @returns any
   * @throws ApiError
   */
  static getSelectVncNodePage(adminPath, page, size, authorization) {
    return request(OpenAPI, {
      method: "GET",
      url: "/{adminPath}/selectVncNodePage",
      path: {
        "adminPath": adminPath
      },
      headers: {
        "Authorization": authorization
      },
      query: {
        "page": page,
        "size": size
      }
    });
  }
}

export { ApiError, ApiNatService, ApiService, CancelError, CancelablePromise, CpuService, ForwardRule, IpService, NatService, OpenAPI, OsService, SdnService, SdnVnetsService, SdnVnetsSubnetsService, Service, VncService };
