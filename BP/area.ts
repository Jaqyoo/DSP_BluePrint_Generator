export class Area {
    index:number
    parent_index:number
    tropic_anchor:number
    area_segments:number
    anchor_local_offset_x:number
    anchor_local_offset_y:number
    width:number
    height:number

    constructor(
        index:number,
        parent_index:number,
        tropic_anchor:number,
        area_segments:number,
        anchor_local_offset_x:number,
        anchor_local_offset_y:number,
        width:number,
        height:number,        
    )
    {
        this.index = index
        this.parent_index = parent_index
        this.tropic_anchor = tropic_anchor
        this.area_segments = area_segments
        this.anchor_local_offset_x = anchor_local_offset_x
        this.anchor_local_offset_y = anchor_local_offset_y
        this.width = width
        this.height = height
    }
}
