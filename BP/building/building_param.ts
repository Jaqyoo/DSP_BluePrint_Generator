export enum AccelerateMode {
    Accerlerate = 1,
    Increase = 0,
}

export interface IBuildingParam {
    getCount():number
    toJSON():Object
}

export class BuildingParamDefault implements IBuildingParam{
    accelerate_mode: AccelerateMode

    constructor(accelerate_mode = AccelerateMode.Accerlerate) {
        this.accelerate_mode = accelerate_mode
    }

    getCount(): number {
        return 1
    }

    toJSON():Object {
        return {"Unknown": [this.accelerate_mode]}
    }
}