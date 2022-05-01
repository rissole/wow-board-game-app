declare module "*.csv" {
  const json: ReadonlyArray<ReadonlyArray<string | number | null>>;
  export = json;
}
