// -------------------------------------------------------------------------------------------------
// 種族クラス
// -------------------------------------------------------------------------------------------------
function Genus(json) {
  //{{{
  // 種族 ID
  this.id = json.id;
  // 名称
  this.name = json.name;
  // スタンス
  this.stance = json.stance;
  // Light neutral Dark
  this.alignment = json.alignment;

  // この種族の文字列表現を返す。(簡易)
  this.toString = function () {
    return this.name;
  }

  // この種族の文字列表現を返す。(詳細)
  this.toDetailString = function () {
    return this.name+"("+ this.alignment +"/"+ this.stance + ")";
  }
  //}}}
}

// 該当する種族を返す
function getGenus(genusID) {//{{{
  return (genusMap[genusID]);
}//}}}

var stance = [];
stance[0] = "law";
stance[1] = "neutral";
stance[2] = "chaos";

var alignment = [];
alignment[0] = "light";
alignment[1] = "neutral";
alignment[2] = "dark";

// 種族
var genusMap = [];
genusMap["0"] = new Genus({id:0,name:"-",stance:"none",alignment:"none"});//{{{ 種族
genusMap["1"] = new Genus({id:1,name:"大天使",stance:stance[0],alignment:alignment[0]});
genusMap["2"] = new Genus({id:2,name:"女神",stance:stance[0],alignment:alignment[0]});
genusMap["3"] = new Genus({id:3,name:"霊鳥",stance:stance[0],alignment:alignment[0]});
genusMap["4"] = new Genus({id:4,name:"神樹",stance:stance[0],alignment:alignment[0]});

genusMap["5"] = new Genus({id:5,name:"天使",stance:stance[0],alignment:alignment[1]});
genusMap["6"] = new Genus({id:6,name:"妖鳥",stance:stance[0],alignment:alignment[1]});
genusMap["7"] = new Genus({id:7,name:"妖魔",stance:stance[0],alignment:alignment[1]});
genusMap["8"] = new Genus({id:8,name:"天女",stance:stance[0],alignment:alignment[1]});

genusMap["9"]  = new Genus({id:9,name:"邪神",stance:stance[0],alignment:alignment[2]});
genusMap["11"] = new Genus({id:11,name:"妖樹",stance:stance[0],alignment:alignment[2]});
genusMap["10"] = new Genus({id:10,name:"凶鳥",stance:stance[0],alignment:alignment[2]});

genusMap["12"] = new Genus({id:12,name:"魔神",stance:stance[1],alignment:alignment[0]});
genusMap["13"] = new Genus({id:13,name:"神獣",stance:stance[1],alignment:alignment[0]});
genusMap["14"] = new Genus({id:14,name:"聖獣",stance:stance[1],alignment:alignment[0]});
genusMap["15"] = new Genus({id:15,name:"幻魔",stance:stance[1],alignment:alignment[0]});

genusMap["16"] = new Genus({id:16,name:"妖精",stance:stance[1],alignment:alignment[1]});
genusMap["17"] = new Genus({id:17,name:"魔獣",stance:stance[1],alignment:alignment[1]});
genusMap["18"] = new Genus({id:18,name:"地霊",stance:stance[1],alignment:alignment[1]});
genusMap["19"] = new Genus({id:19,name:"龍王",stance:stance[1],alignment:alignment[1]});

genusMap["20"] = new Genus({id:20,name:"死神",stance:stance[1],alignment:alignment[2]});
genusMap["21"] = new Genus({id:21,name:"妖獣",stance:stance[1],alignment:alignment[2]});
genusMap["22"] = new Genus({id:22,name:"邪鬼",stance:stance[1],alignment:alignment[2]});
genusMap["23"] = new Genus({id:23,name:"妖虫",stance:stance[1],alignment:alignment[2]});

genusMap["24"] = new Genus({id:24,name:"破壊神",stance:stance[2],alignment:alignment[0]});
genusMap["25"] = new Genus({id:25,name:"地母神",stance:stance[2],alignment:alignment[0]});
genusMap["26"] = new Genus({id:26,name:"龍神",stance:stance[2],alignment:alignment[0]});
genusMap["27"] = new Genus({id:27,name:"鬼神",stance:stance[2],alignment:alignment[0]});

genusMap["28"] = new Genus({id:28,name:"堕天使",stance:stance[2],alignment:alignment[1]});
genusMap["29"] = new Genus({id:29,name:"妖鬼",stance:stance[2],alignment:alignment[1]});
genusMap["30"] = new Genus({id:30,name:"鬼女",stance:stance[2],alignment:alignment[1]});
genusMap["31"] = new Genus({id:31,name:"夜魔",stance:stance[2],alignment:alignment[1]});

genusMap["32"] = new Genus({id:32,name:"魔王",stance:stance[2],alignment:alignment[2]});
genusMap["33"] = new Genus({id:33,name:"邪龍",stance:stance[2],alignment:alignment[2]});
genusMap["34"] = new Genus({id:34,name:"悪霊",stance:stance[2],alignment:alignment[2]});
genusMap["35"] = new Genus({id:35,name:"外道",stance:stance[2],alignment:alignment[2]});

genusMap["36"] =  new Genus({id:36,name:"幽鬼",stance:stance[2],alignment:alignment[1]});

genusMap["38"] = new Genus({id:38,name:"精霊",stance:stance[1],alignment:alignment[0]});
genusMap["39"] = new Genus({id:39,name:"魔人",stance:stance[1],alignment:alignment[2]});
genusMap["40"] = new Genus({id:40,name:"秘神",stance:stance[1],alignment:alignment[0]});
genusMap["41"] = new Genus({id:41,name:"珍獣",stance:stance[1],alignment:alignment[1]});
genusMap["42"] = new Genus({id:42,name:"狂神",stance:stance[1],alignment:alignment[2]});
genusMap["43"] = new Genus({id:43,name:"人間",stance:"none",alignment:"none"});
genusMap["44"] = new Genus({id:44,name:"御魂",stance:stance[1],alignment:alignment[0]});
genusMap["45"] = new Genus({id:45,name:"超人",stance:"none",alignment:"none"});
genusMap["48"] = new Genus({id:48,name:"威霊",stance:stance[2],alignment:alignment[0]});
genusMap["49"] = new Genus({id:49,name:"大霊母",stance:"none",alignment:"none"});
genusMap["50"] = new Genus({id:50,name:"虚大霊",stance:"none",alignment:"none"});
genusMap["51"] = new Genus({id:51,name:"覚醒人",stance:"none",alignment:"none"});
genusMap["52"] = new Genus({id:52,name:"大地人",stance:"none",alignment:"none"});
genusMap["53"] = new Genus({id:53,name:"審判者",stance:"none",alignment:"none"});
genusMap["54"] = new Genus({id:54,name:"聖柱",stance:"none",alignment:"none"});
genusMap["55"] = new Genus({id:55,name:"偽人",stance:stance[0],alignment:alignment[0]});//}}}
