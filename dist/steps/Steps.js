import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { StepType, UploadFlow } from './UploadFlow.js';
import { ModalHeader } from '@chakra-ui/react';
import { useSteps, Steps as Steps$1, Step } from 'chakra-ui-steps';
import { CgCheck } from 'react-icons/cg';
import { useRsi } from '../hooks/useRsi.js';
import { useState, useRef } from 'react';
import { stepTypeToStepIndex, steps, stepIndexToStepType } from '../utils/steps.js';

const CheckIcon = ({ color }) => jsx(CgCheck, { size: "36px", color: color });
const Steps = () => {
    const { initialStepState, translations, isNavigationEnabled } = useRsi();
    const initialStep = stepTypeToStepIndex(initialStepState?.type);
    const { nextStep, activeStep, setStep } = useSteps({
        initialStep,
    });
    const [state, setState] = useState(initialStepState || { type: StepType.upload });
    const history = useRef([]);
    const onClickStep = (stepIndex) => {
        const type = stepIndexToStepType(stepIndex);
        const historyIdx = history.current.findIndex((v) => v.type === type);
        if (historyIdx === -1)
            return;
        const nextHistory = history.current.slice(0, historyIdx + 1);
        history.current = nextHistory;
        setState(nextHistory[nextHistory.length - 1]);
        setStep(stepIndex);
    };
    const onBack = () => {
        onClickStep(Math.max(activeStep - 1, 0));
    };
    const onNext = (v) => {
        history.current.push(state);
        setState(v);
        v.type !== StepType.selectSheet && nextStep();
    };
    return (jsxs(Fragment, { children: [jsx(ModalHeader, { display: ["none", "none", "block"], children: jsx(Steps$1, { activeStep: activeStep, checkIcon: CheckIcon, onClickStep: isNavigationEnabled ? onClickStep : undefined, responsive: false, children: steps.map((key) => (jsx(Step, { label: translations[key].title }, key))) }) }), jsx(UploadFlow, { state: state, onNext: onNext, onBack: isNavigationEnabled ? onBack : undefined })] }));
};

export { Steps };
