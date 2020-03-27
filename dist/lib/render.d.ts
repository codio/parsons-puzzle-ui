import { Cash } from 'cash-dom';
import { ParsonsGrader, ParsonsSettings, VariableTest, AssertEqualParams } from '../@types/types';
export declare const renderVarTest: (test?: VariableTest | undefined) => Cash;
export declare const renderUnitTest: (test?: AssertEqualParams | undefined) => Cash;
export declare const renderGrader: (container: Cash, grader: ParsonsGrader) => void;
export declare const render: (container: Cash, settings: ParsonsSettings) => void;
declare const _default: {
    render: (container: Cash, settings: ParsonsSettings) => void;
};
export default _default;
//# sourceMappingURL=render.d.ts.map