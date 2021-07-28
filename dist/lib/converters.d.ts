import { ParsonsGrader, UnitTest } from '../@types/types';
export declare const convertParsonsGraderFuncToEnum: (grader?: (() => void) | string | undefined) => ParsonsGrader;
export declare const convertTestVariablesToString: (variables: Record<string, string | number>) => string;
export declare const convertUnitTestsFromString: (unitTestsStr: string | undefined) => UnitTest[];
declare const _default: {
    convertParsonsGraderFuncToEnum: (grader?: string | (() => void) | undefined) => ParsonsGrader;
    convertTestVariablesToString: (variables: Record<string, string | number>) => string;
};
export default _default;
//# sourceMappingURL=converters.d.ts.map