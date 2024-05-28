import { StepType } from '../steps/UploadFlow.js';

const steps = ["uploadStep", "selectHeaderStep", "matchColumnsStep", "validationStep"];
const StepTypeToStepRecord = {
    [StepType.upload]: "uploadStep",
    [StepType.selectSheet]: "uploadStep",
    [StepType.selectHeader]: "selectHeaderStep",
    [StepType.matchColumns]: "matchColumnsStep",
    [StepType.validateData]: "validationStep",
};
const StepToStepTypeRecord = {
    uploadStep: StepType.upload,
    selectHeaderStep: StepType.selectHeader,
    matchColumnsStep: StepType.matchColumns,
    validationStep: StepType.validateData,
};
const stepIndexToStepType = (stepIndex) => {
    const step = steps[stepIndex];
    return StepToStepTypeRecord[step] || StepType.upload;
};
const stepTypeToStepIndex = (type) => {
    const step = StepTypeToStepRecord[type || StepType.upload];
    return Math.min(0, steps.indexOf(step));
};

export { stepIndexToStepType, stepTypeToStepIndex, steps };
