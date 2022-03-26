import { StationLocalLogic, StationParamsSlot, StationParamStorage, StationRemoteLogic, StationSlotsDir } from "../BP/building/station"

export enum spray_coater_index {
    iron_ore_0 = 0, // for iron plate
    iron_ore_1, // for magnet_plate
    copper_ore,

    iron_plate_0,
    iron_plate_1,
    iron_plate_2,
    iron_plate_3,

    magnet_plate_0,
    magnet_plate_1,
    magnet_plate_2,
    magnet_plate_3,

    copper_plate_0,
    copper_plate_1,
    copper_plate_2,
    copper_plate_3,

    magnetism_wire_0,
    magnetism_wire_1,
    magnetism_wire_2,
    magnetism_wire_3,

    circuit_board_0,
    circuit_board_1,
    circuit_board_2,
    circuit_board_3,

    max,
}

export enum belt_index {
    iron_ore_0, 
    iron_ore_1,
    copper_ore,

    magnet_plate_0,
    magnet_plate_1,
    magnet_plate_2,
    magnet_plate_3,

    iron_plate_0,
    iron_plate_1,
    iron_plate_2,
    iron_plate_3,

    copper_plate_0,
    copper_plate_1,
    copper_plate_2,
    copper_plate_3,

    magnetism_wire_0,
    magnetism_wire_1,
    magnetism_wire_2,
    magnetism_wire_3,

    circuit_board_0,
    circuit_board_1,
    circuit_board_2,
    circuit_board_3,

    blue_matrix_0,
    blue_matrix_1,
    blue_matrix_2,
    blue_matrix_3,

    accelerator,

    station_iron_ore_0,
    station_iron_ore_1,
    station_copper_ore,
    station_accelerator,
    station_blue_matrix_0,
    station_blue_matrix_1,
    station_blue_matrix_2,
    station_blue_matrix_3,

    max,
}

export enum smelter_index {
    iron_plate,
    magnet_plate,
    copper_plate,
    max
}

export enum assembler_index {
    magnetism_wire,
    circuit_board,
    max
}

export enum ingress_inserter_index {
    magnet_plate,
    iron_plate,
    copper_plate,

    magnetism_wire_0,
    magnetism_wire_1,
    circuit_board_0,
    circuit_board_1,

    blue_matrix_0,
    blue_matrix_1,

    max
}

export enum egress_inserter_index {
    magnet_plate,
    iron_plate,
    copper_plate,

    magnetism_wire,
    circuit_board,

    blue_matrix,

    max
}

export const building_num = {
    iron_plate:24,
    magnet_plate:36,
    copper_plate:24,
    circuit_board:16,
    magnetism_wire:16,
    blue_matrix:20,
    spray_router: 27,
}

export const belt_num = {
    iron_ore_0: 30, // 24 + 6 + ?
    iron_ore_1: 42, // 36 + 6 + ?
    copper_ore:30, //24 + 6

    iron_plate_0: 16, // 6 + 6 + 4
    iron_plate_1: 16, // 6 + 6 + 4
    iron_plate_2: 16, // 6 + 6 + 4
    iron_plate_3: 16, // 6 + 6 + 4

    magnet_plate_0: 19, // 9 + 6 + 4
    magnet_plate_1: 19, // 9 + 6 + 4
    magnet_plate_2: 19, // 9 + 6 + 4
    magnet_plate_3: 19, // 9 + 6 + 4

    copper_plate_0: 22, // 6 + 12 + 4
    copper_plate_1: 22, // 6 + 12 + 4
    copper_plate_2: 22, // 6 + 12 + 4
    copper_plate_3: 22, // 6 + 12 + 4

    circuit_board_0: 18, // 4 + 6 + 8
    circuit_board_1: 18, // 4 + 6 + 8
    circuit_board_2: 18, // 4 + 6 + 8
    circuit_board_3: 18, // 4 + 6 + 8

    magnetism_wire_0: 18, // 4 + 6 + 8
    magnetism_wire_1: 18, // 4 + 6 + 8
    magnetism_wire_2: 18, // 4 + 6 + 8
    magnetism_wire_3: 18, // 4 + 6 + 8

    blue_array_0:8, // 8 + ?
    blue_array_1:8, // 8 + ?
    blue_array_2:8, // 8 + ?
    blue_array_3:8, // 8 + ?
}

export const station_storage:Array<StationParamStorage> = [
    {
        // 铁
        itemId:1001,
        localLogic: StationLocalLogic.Storage,
        remoteLogic: StationRemoteLogic.Storage,
        max: 20000
    },
    {
        // 铜
        itemId:1002,
        localLogic: StationLocalLogic.Storage,
        remoteLogic: StationRemoteLogic.Storage,
        max: 20000
    },
    {
        // 增产III
        itemId:1143,
        localLogic: StationLocalLogic.Storage,
        remoteLogic: StationRemoteLogic.Storage,
        max: 20000
    },
    {
        // 曲率
        itemId:1210,
        localLogic: StationLocalLogic.Storage,
        remoteLogic: StationRemoteLogic.Storage,
        max: 2000
    },
    {
        // 蓝糖
        itemId:6001,
        localLogic: StationLocalLogic.Storage,
        remoteLogic: StationRemoteLogic.Storage,
        max: 20000
    },
]

export const station_slot = [
    null,
    new StationParamsSlot(StationSlotsDir.Egress, 0),  //iron_ore_1 
    new StationParamsSlot(StationSlotsDir.Ingress, 3), //blue_matrix_0

    new StationParamsSlot(StationSlotsDir.Ingress, 3), //blue_matrix_1
    new StationParamsSlot(StationSlotsDir.Ingress, 3), //blue_matrix_2
    new StationParamsSlot(StationSlotsDir.Ingress, 3), //blue_matrix_3

    null,
    null,
    null,

    new StationParamsSlot(StationSlotsDir.Egress, 1), //copper_ore
    new StationParamsSlot(StationSlotsDir.Egress, 0), //iron_ore_0
    new StationParamsSlot(StationSlotsDir.Egress, 2), //accelerator
]

