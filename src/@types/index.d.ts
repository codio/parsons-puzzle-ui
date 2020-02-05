interface VariableTest {
  initcode?: string;
  code?: string;
  message?: string;
  variables: object; // todo
}

interface ParsonsOptions {
  sortableId?: string;
  trashId?: string;
  max_wrong_lines?: number;
  can_indent?: boolean;
  vartests?: VariableTest[];
  grader?: () => void;
  executable_code?: string;
  programmingLang?: string;
  unittests?: string;
  toggleTypeHandlers? : object; // todo
  turtleModelCode?: string;
  feedback_cb?: boolean | (() => void); // eslint-disable-line  @typescript-eslint/camelcase
  lang?: string;
  x_indent?: number;
  exec_limit?: number;
}

interface ParsonsSettings {
  initial: string;
  options: ParsonsOptions;
}

declare enum ParsonsGrader {
  LineBased= 'LineBasedGrader',
  VariableCheck = 'VariableCheckGrader',
  UnitTest = 'UnitTestGrader',
  LanguageTranslation = 'LanguageTranslationGrader',
  Turtle = 'TurtleGrader'
}
