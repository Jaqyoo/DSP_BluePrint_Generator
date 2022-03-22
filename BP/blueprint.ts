import { Area } from "./area"
import { Building } from "./building"

const game_version = '0.9.24.11286'

class BluePrintHeader {
    version: number
    cursor_offset_x: number
    cursor_offset_y: number
    cursor_target_area: number
    dragbox_size_x: number
    dragbox_size_y: number
    primary_area_index: number
    area_count: number
}

class BluePrintData {
    header: BluePrintHeader
    areas: Array<Area>
    building_count: number
    buildings: Array<Building>
}

export class BluePrint {
    layout: number
    icons: [number, number, number, number, number]
    timestamp: number
    game_version: string
    short_desc: string
    desc: string

    data: BluePrintData

    constructor(
        timestamp: number,
        cursor_offset_x: number,
        cursor_offset_y: number,
        cursor_offset_area: number,
        dragbox_size_x: number,
        dragbox_size_y: number,
        layout = 1,
        icon0 = 0,
        icon1 = 0,
        icon2 = 0,
        icon3 = 0,
        icon4 = 0,
        short_desc = "",
        desc = "") {

        this.layout = layout
        this.icons = [icon0, icon1, icon2, icon3, icon4]
        this.game_version = game_version
        this.timestamp = timestamp
        this.short_desc = short_desc
        this.desc = desc
        this.data = new BluePrintData()
        this.data.header = new BluePrintHeader()
        this.data.areas = new Array<Area>()
        this.data.buildings = new Array<Building>()

        this.data.header.version = 1
        this.data.header.cursor_offset_x = cursor_offset_x
        this.data.header.cursor_offset_y = cursor_offset_y
        this.data.header.cursor_target_area = cursor_offset_area
        this.data.header.dragbox_size_x = dragbox_size_x
        this.data.header.dragbox_size_y = dragbox_size_y
        this.data.header.primary_area_index = 0
        this.data.header.area_count = 0
        this.data.building_count = 0
    }

    export():string {        
        return JSON.stringify(this, null, 2)
    }

    addArea(
        parent_index: number,
        tropic_anchor: number,
        area_segments: number,
        anchor_local_offset_x: number,
        anchor_local_offset_y: number,
        width: number,
        height: number,
    ) {
        let area = new Area(
            this.data.header.area_count,
            parent_index,
            tropic_anchor,
            area_segments,
            anchor_local_offset_x,
            anchor_local_offset_y,
            width,
            height,
        )
        this.data.areas.push(area)
        this.data.header.area_count++
        return area.index
    }

    addBuilding(building:Building):Building {
        building.setIndex(this.data.building_count)
        this.data.buildings.push(building)
        this.data.building_count++
        return building
    }

    addBuildings(buildings:Array<Building>):Array<Building> {
        buildings.forEach(building => this.addBuilding(building))
        return buildings
    }
}