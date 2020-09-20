import jsoun from "jsoun";

export const getBaseUrl = () => {
  const getUrl = window.location;

  return (
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1]
  );
};

const cleanseData = (data) => {
  const params = data.scaleParams && data.scaleParams.params;
  const cleanedParams = params.map((p) => {
    const sat = p.sat;
    if (sat) {
      return {
        ...p,
        sat: {
          ...sat,
          rate: sat.rate || 100,
        },
      };
    }

    return p;
  });

  return {
    ...data,
    scaleParams: {
      ...data.scaleParams,
      params: cleanedParams,
    },
  };
};

export const getStateFromUrl = () => {
  const data = window.location.hash.substr(1);
  if (data === "") return {};
  try {
    const decodedData = jsoun.decode(data);
    return cleanseData(decodedData);
  } catch (e) {
    console.error("Unable to parse state from URL", e);
    return {};
  }
};
