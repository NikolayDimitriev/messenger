export type TProps = Record<string, unknown> & {
  classname?: string[];
  events?: Record<string, (e?: Event) => void>;
}
