interface IReturnData {
  data: {
    key: string;
    value: unknown;
  }[];
  files: {
    key: string;
    blobString: string;
  }[];
}

export function generateStatusData(obj: {
  [key: string]: unknown;
}): IReturnData {
  const data = [];
  const files = [];

  for (const key in obj) {
    if (key.startsWith('regula')) {
      files.push({
        key,
        blobString: obj[key] as string,
      });
    } else {
      data.push({
        key,
        value: obj[key],
      });
    }
  }
  return { data, files };
}
