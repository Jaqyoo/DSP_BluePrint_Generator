# 戴森球计划蓝图生成脚本

该脚本用来生成戴森球蓝图，将会先生成描述建筑布局的JSON文件

然后使用来自 https://github.com/Wesmania/dspbp 的编译器将JSON文件转换成游戏中的蓝图文件

## 试用

> npm i 
> npm start --output=output.json
> ./third/dspbp.exe -i output.json -o output.txt undump 

## 当前状态

7200 蓝糖（未完成，缺物流塔出入口和垂直传送带）

----

# Dyson Sphere Project Blueprint Generator

Try to generate the blueprint by code. It will generate the JSON file which describes the DSP blueprint.

The compiler to convert blueprint.json to blueprint.txt is copy from  https://github.com/Wesmania/dspbp

## Test

> npm i 
> npm start --output=output.json
> ./third/dspbp.exe -i output.json -o output.txt undump 

# Current Status

7200 Electric Matrix (not complete for the station and the belts)
