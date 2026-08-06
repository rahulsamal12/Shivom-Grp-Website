const normalizeUrls = (value, origin) => {
  if (!origin) return value;

  if (typeof value === "string") {
    // Replaces patterns like http://127.0.0.1:5099/uploads/... or http://localhost:5000/uploads/...
    // with the correct current origin (e.g. https://apishivom.visital.co.in/uploads/...)
    return value.replace(/https?:\/\/[^\/]+(\/uploads\/)/g, `${origin}$1`);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeUrls(item, origin));
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    // If it's a Mongoose document, convert to plain object
    if (typeof value.toObject === "function") {
      return normalizeUrls(value.toObject(), origin);
    }

    // Only traverse plain objects (e.g. from {} or new Object()), not custom class instances like ObjectId
    const proto = Object.getPrototypeOf(value);
    if (proto === null || proto === Object.prototype) {
      const newObj = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          newObj[key] = normalizeUrls(value[key], origin);
        }
      }
      return newObj;
    }
  }

  return value;
};

export const successResponse = (res, message, data = {}, statusCode = 200) => {
  const req = res.req;
  const configuredOrigin = process.env.PUBLIC_API_URL || process.env.API_BASE_URL;
  let publicApiOrigin = "";

  if (configuredOrigin) {
    publicApiOrigin = configuredOrigin.replace(/\/api\/?$/, "").replace(/\/$/, "");
  } else if (req) {
    publicApiOrigin = `${req.protocol}://${req.get("host")}`;
  }

  const processedData = normalizeUrls(data, publicApiOrigin);

  return res.status(statusCode).json({
    success: true,
    message,
    data: processedData
  });
};

export const errorResponse = (res, message, statusCode = 400) =>
  res.status(statusCode).json({
    success: false,
    message
  });


