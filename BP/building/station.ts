import { local_diff } from "../../util";
import { BluePrint } from "../blueprint";
import { Building } from "../building";
import { IBuildingParam } from "../building_param";
import { Belt, connectBelts } from "./belt";

export enum StationLocalLogic {
    Storage = 0,
    Egress = 1,
    Ingress = 2,
}

export enum StationRemoteLogic {
    Storage = 0,
    Egress = 1,
    Ingress = 2,
}

export class StationParamStorage {
    itemId: number
    localLogic: number
    remoteLogic: number
    max:number

    constructor(itemId: number, localLogic: StationLocalLogic = StationLocalLogic.Egress, remoteLogic: StationRemoteLogic = StationRemoteLogic.Egress, max:number = 10000) {
        this.itemId = itemId
        this.localLogic = localLogic
        this.remoteLogic = remoteLogic
        this.max = max
    }
}

export enum StationSlotsDir {
    Egress = 1,
    Ingress = 2,
}

export class StationParamsSlot {
    dir: StationSlotsDir
    storage_idx: number

    constructor(dir:StationSlotsDir = StationSlotsDir.Ingress, storage_idx:number = 0) {
        this.dir = dir
        this.storage_idx = storage_idx + 1
    }
}

export class StationParams implements IBuildingParam {
    Unknown: Array<number>

    storage: Array<StationParamStorage> // 5
    slots: Array<StationParamsSlot> // 12

    work_energy_per_tick: number = 5000000
    trip_range_drones:number = 4194967296
    trip_range_ships:number = 240000000
    includeOrbitCollector:boolean = true
    warpEnbleDist:number = 20000
    warp_necessary:boolean = true
    delivery_drones:number = 10
    delivery_ships:number = 100
    piler_count:number = 50

    constructor() {
        this.storage = new Array(5)
        for (let i = 0; i < 5; i ++) {
            this.storage[i] = new StationParamStorage(0)
        }

        this.slots = new Array(12)
        for (let i = 0; i < 12; i++) {
            this.slots[i] = new StationParamsSlot()
        }

        this.Unknown = new Array<number>(2048)
        for (let i = 0; i < 2048; i++) {
            this.Unknown[i] = 0
        }
    }

    setStorage(storage_id:number, storage:StationParamStorage) {
        this.storage[storage_id].itemId = storage.itemId
        this.storage[storage_id].localLogic = storage.localLogic
        this.storage[storage_id].remoteLogic = storage.remoteLogic
        this.storage[storage_id].max = storage.max
    }

    setSlot(slot_id:number, param:StationParamsSlot) {
        this.slots[slot_id].dir = param.dir
        this.slots[slot_id].storage_idx = param.storage_idx
    }

    getCount(): number {
        return 2048
    }
    toJSON(): Object {
        let base:number
        base = 0
        for (let i = 0; i < 5; i++) {
            this.Unknown[base + i * 6] = this.storage[i].itemId
            this.Unknown[base + i * 6 + 1] = this.storage[i].localLogic
            this.Unknown[base + i * 6 + 2] = this.storage[i].remoteLogic
            this.Unknown[base + i * 6 + 3] = this.storage[i].max
        }

        base += 192
        for (let i = 0; i < this.slots.length; i++) {
            this.Unknown[base + i * 4] = this.slots[i].dir
            this.Unknown[base + i * 4 + 1] = this.slots[i].storage_idx
        }

        base += 128
        this.Unknown[base + 0] = this.work_energy_per_tick
        this.Unknown[base + 1] = this.trip_range_drones
        this.Unknown[base + 2] = this.trip_range_ships
        this.Unknown[base + 3] = this.includeOrbitCollector ? 1 : -1
        this.Unknown[base + 4] = this.warpEnbleDist
        this.Unknown[base + 5] = this.warp_necessary ? 1 : -1
        this.Unknown[base + 6] = this.delivery_drones
        this.Unknown[base + 7] = this.delivery_ships
        this.Unknown[base + 8] = this.piler_count


        base += 64

        return {Unknown: this.Unknown}
    }
}

export class Station extends Building {
    param: StationParams;

    constructor(
        area_index:number,
        local:[number, number] = null,
    ) {
        let local_3:[number, number, number]
        if (local === null) local_3 = null
        else local_3 = [local[0], local[1], 0]
        super(area_index, local_3, local_3, 2104, 50)
        this.setParam(new StationParams())
    }
    

    setStorage(slot_id:number, storage:StationParamStorage) {
        this.param.setStorage(slot_id, storage)
    }

    setSlot(slot_id:number, param:StationParamsSlot) {
        this.param.setSlot(slot_id, param)
    }

    getBeltLocal(bp: BluePrint, slot_id:number): [Belt, Belt] {
        let local_base:[number, number, number] = [this.header.local_offset_x, this.header.local_offset_y, this.header.local_offset_z]
        let local_station:[number, number, number]
        let local_slot:[number, number, number]
        let belts:[Belt, Belt] = [null, null]

        if (slot_id <= 2) {
            local_station = local_diff(local_base, [slot_id - 1 , -2, 0])
            local_slot = local_diff(local_base, [slot_id -1, -3, 0])
        }
        else if (slot_id <= 5) {
            local_station = local_diff(local_base, [2,slot_id-4, 0])
            local_slot = local_diff(local_base, [3, slot_id-4, 0])
        }
        else if (slot_id <= 8) {
            local_station = local_diff(local_base, [7-slot_id, 2, 0])
            local_slot = local_diff(local_base, [7-slot_id, 3, 0])
        }
        else {
            local_station = local_diff(local_base, [-2, 10-slot_id, 0])
            local_slot = local_diff(local_base, [-3, 10-slot_id, 0])
        }

        let belt_slot = new Belt(this.header.area_index, local_slot)
        let belt_station = new Belt(this.header.area_index, local_station)
        bp.addBuilding(belt_slot)
        bp.addBuilding(belt_station)

        if (this.param.slots[slot_id].dir == StationSlotsDir.Egress) {
            belts[0] = belt_station
            belts[1] = belt_slot
            belt_station.header.input_from_slot = slot_id
            belt_station.header.input_object_index = this.header.index
            connectBelts(belts)
        }
        else {
            belts[0] = belt_slot
            belts[1] = belt_station
            belt_station.header.output_to_slot = slot_id
            belt_station.header.output_object_index = this.header.index
            connectBelts(belts)
            belt_station.header.yaw = belt_slot.header.yaw
            belt_station.header.yaw2 = belt_slot.header.yaw2
        }
        return belts
    }
}