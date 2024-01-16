export interface Configuration {
  port: number;
  api: {
    external: string;
  };
}

const getEnvVariable = <Data>(
  envName: string,
  defaultValue: Data,
  transform?: (initialValue: string) => Data,
): Data => {
  if (process.env[envName] === undefined) return defaultValue;

  return transform
    ? // @ts-expect-error -- нет ошибки
      transform(process.env[envName])
    : (process.env[envName] as Data);
};

export const configuration = (): Configuration => ({
  port: getEnvVariable("PORT", 3000, Number),
  api: {
    external: getEnvVariable("EXTERNAL_API_URL", ""),
  },
});
