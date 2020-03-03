export interface Dictionary<T> {
  [key: string]: T;
}

export const enum ParsonsGrader {
  LineBased= 'LineBasedGrader',
  VariableCheck = 'VariableCheckGrader',
  UnitTest = 'UnitTestGrader',
  LanguageTranslation = 'LanguageTranslationGrader',
  Turtle = 'TurtleGrader'
}

export interface VariableTest {
  initcode?: string;
  code?: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: Dictionary<any>;
  variable?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expected?: any;
}

export interface ToggleTypeHandler {
  'boolean'?: string[];
  compop?: string[];
  mathop?: string[];
  boolop?: string[];
  range?: () => string[];
}

export interface ParsonsOptions {
  sortableId?: string;
  trashId?: string;
  max_wrong_lines?: number;
  can_indent?: boolean;
  vartests?: VariableTest[];
  grader?: (() => void) | string;
  executable_code?: string;
  programmingLang?: string;
  unittests?: string;
  toggleTypeHandlers? : ToggleTypeHandler[];
  turtleModelCode?: string;
  feedback_cb?: boolean | (() => void); // eslint-disable-line  @typescript-eslint/camelcase
  lang?: string;
  x_indent?: number;
  exec_limit?: number;
  unittest_code_prepend?: string;
}

export interface ParsonsSettings {
  initial: string;
  options: ParsonsOptions;
}

export interface UnitTest {
  methodCall: string;
  expectedOutput: string;
  errorMessage?: string;
}
