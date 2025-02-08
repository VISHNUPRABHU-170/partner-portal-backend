class JWTUtils {
  decodeJWT = (token) => {
    const [header, payload, signature] = token.split(".");
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
    return { decodedHeader, decodedPayload, signature };
  };
}

export default new JWTUtils();
