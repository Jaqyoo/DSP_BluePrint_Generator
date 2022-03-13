import { BluePrint } from "../BP/blueprint";
import { BeltList } from "../BP/builiding/belt";
import { BuildingList } from "../BP/builiding/builiding";
import { Inserter } from "../BP/builiding/inserter";
import { SmelterList } from "../BP/builiding/smelter";
import { TeslaCoil } from "../BP/builiding/tesla_coil";

export class NearlySmelterGroup extends BuildingList {
    bp: BluePrint
    smelters_00: SmelterList
    smelters_13: SmelterList
    ingress_belts: BeltList
    egress_belts: BeltList
    ingress_inserters: Array<Inserter>
    egress_inserters: Array<Inserter>
    tesla_coil: TeslaCoil

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number],
        recipe_id:number,
        smelter_level = 2,
        belt_level = 3,
        inserter_level = 3
    ) {
        super()
        this.bp = bp

        this.smelters_00 = bp.addBuildings(new SmelterList(area_index, [local[0] + 1.0, local[1] + 1.0, 0.0], recipe_id, [3, 1], [2.5, 5], smelter_level)) as SmelterList
        this.smelters_00.concat(bp.addBuildings(new SmelterList(area_index, [local[0] + 9.0, local[1] + 1.0, 0.0], recipe_id, [3, 1], [2.5, 5], smelter_level)) as SmelterList)
        
        this.smelters_13 = bp.addBuildings(new SmelterList(area_index, [local[0] + 1.0, local[1] + 3.5, 1.3], recipe_id, [3, 1], [2.5, 5], smelter_level)) as SmelterList
        this.smelters_13.concat(bp.addBuildings(new SmelterList(area_index, [local[0] + 9.0, local[1] + 3.5, 1.3], recipe_id, [3, 1], [2.5, 5], smelter_level)) as SmelterList)

        this.ingress_belts = (bp.addBuildings(new BeltList(area_index, 16, [local[0], local[1] + 1, 5], undefined, belt_level)) as BeltList).connect()
        this.egress_belts = (bp.addBuildings(new BeltList(area_index, 16, [local[0], local[1] + 3, 5], undefined, belt_level)) as BeltList).connect()

        this.tesla_coil = bp.addBuilding(new TeslaCoil(area_index, local[0] + 7.5, local[1] + 2.25)) as TeslaCoil

        this.ingress_inserters = new Array<Inserter>()
        this.egress_inserters = new Array<Inserter>()
        this.smelters_00.forEach((smelter, index, array) => {
            this.egress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [smelter.header.local_offset_x - 1.0, smelter.header.local_offset_y + 1.0, 0], 
                    [smelter.header.local_offset_x - 1.0, smelter.header.local_offset_y + 2.2, 0],
                    this.ingress_belts.getList()[index*2].header.index, smelter.header.index, 
                    -1, 0, 0, 1)
            ) as Inserter )

            this.ingress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [smelter.header.local_offset_x, smelter.header.local_offset_y + 2.2, 0],
                    [smelter.header.local_offset_x, smelter.header.local_offset_y + 1.0, 0], 
                    smelter.header.index, this.egress_belts.getList()[index*2].header.index, 
                    1, -1, 0, 1)
            ) as Inserter )
        });

        this.smelters_13.forEach((smelter, index, array) => {
            this.egress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [smelter.header.local_offset_x - 1.0, smelter.header.local_offset_y - 1.0, 1.3], 
                    [smelter.header.local_offset_x - 1.0, smelter.header.local_offset_y - 2.2, 1.3],
                    this.ingress_belts.getList()[index*2+1].header.index, smelter.header.index, 
                    -1, 8, 0, 1)
            ) as Inserter )

            this.ingress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [smelter.header.local_offset_x, smelter.header.local_offset_y - 2.2, 1.3],
                    [smelter.header.local_offset_x, smelter.header.local_offset_y - 1.0, 1.3], 
                    smelter.header.index, this.egress_belts.getList()[index*2+1].header.index, 
                    7, -1, 0, 1)
            ) as Inserter )
        });
    }
}