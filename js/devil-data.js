/*
 * 悪魔クラス
 * @param {Object} devil 悪魔データのオブジェクトです。
 *
 * 引数内プロパティ
 *        {Integer}  id
 *        {Integer}  genusID 種族ID
 *        {String}  name  名前
 *        {Integer}  HP  HP
 *        {Integer}  MP  MP
 *        {Integer}  baseHP  HP倍率
 *        {Integer}  baseMP  MP倍率
 *        {Integer}  devilCost  悪魔特有のコスト係数
 *        {Array} attr  属性耐性配列
 *        {Array} skillDefault  悪魔がはじめから持っているスキル
 *        {Integer}  lvDefault 悪魔の規定のレベル
 *        {Integer}  strDefault  悪魔の規定の力
 *        {Integer}  intDefault  悪魔の規定の魔
 *        {Integer}  vitDefault  悪魔の規定の体
 *        {Integer}  agiDefault  悪魔の規定の速
 *        {Integer}  lukDefault  悪魔の規定の運
 *        {Boolean} playerUses 敵専用などエラーが出るモノの表示可否 敵専用の初期値はfalse
 */
function Devil(devil) {
  // 悪魔 ID
  this.devilID = devil.id || devil.devilID;
  // 種族 ID
  this.genusID = devil.genusID;
  this.genus = getGenus(devil.genusID);
  // 名称
  this.name = devil.name;
  // Lv
  this.lv = this.lvDefault = devil.lvDefault;
  // 経験値
  this.exp = 0;
  // 能力値・実値 (HP・MP・力・魔・体・速・運)
  this.HP = devil.HP;
  this.addHP = devil.HP;
  this.baseHP = devil.baseHP;
  this.MP = devil.MP;
  this.addMP = devil.MP;
  this.baseMP = devil.baseMP;
  this.strDefault = this.str = devil.strDefault;
  this.intDefault = this.int = devil.intDefault;
  this.vitDefault = this.vit = devil.vitDefault;
  this.agiDefault = this.agi = devil.agiDefault;
  this.lucDefault = this.luc = devil.lucDefault;

  this.devilCost = parseInt(devil.devilCost);
  this.maxSkillCost = 0;

  // 能力値・基準値 (力・魔・体・速・運)
  this.strBase = 1;
  this.intBase = 1;
  this.vitBase = 1;
  this.agiBase = 1;
  this.lucBase = 1;
  // 属性(物・銃・火・氷・電・風・破・呪)
  this.attr = [];
  for (var i = 0; i < devil.attr.length; i++) {
    this.attr[i] = getAttr(devil.attr[i]);
  };
  // スキル(1～6)
  this.skillDefault = this.skill = devil.skillDefault;
  // オリジナルデータへの参照
  this.original = this;
  this.playerUses = devil.playerUses;
  this.totalCost = devil.totalCost ? devil.totalCost : 0 ;
  this.halfCost = devil.halfCost ? devil.halfCost : 0 ;
  this.maxSkillCost = devil.maxSkillCost ? devil.maxSkillCost : 0 ;
  this.password = devil.password ? devil.password : undefined ;

  this.expMax = 2097151;

  /**
   * 計算しなければならないステータスを全て計算します。
   * @return Devil this
   */
  this.calculateAll = function  () {
    this.calculateCost();
    this.calculateHP();
    this.calculateMP();
    this.calculateEXPMax();
    this.halfCost = Math.floor(this.totalCost/2);
    this.changeAttr();
    return this;
  }

  /**
   * 最大コスト算出します。
   * this.skillが正しく設定されている必要があります。
   * @return Integer 最大スキルコスト
   */
  this.calculateMaxSkillCost = function () {
    this.maxSkillCost = 0;//{{{
    for (var i = 0, len = this.skill.length; i < len; i++) {
      // null回避用にゼロを入れる
      var skillData = getSkill(this.skill[i] ? this.skill[i] :0 );
      // 初期所持スキルはコスト0として扱われるため、最大コスト算出より除外する
      if (!this.isDefaultSkill(skillData.skillID)) {
        this.maxSkillCost < skillData.cost
          ? this.maxSkillCost = skillData.cost
          : this.maxSkillCost;
      }
    }
    ;
    return this.maxSkillCost;//}}}
  }

  /**
   * 最大経験値を算出します。
   */
  this.calculateEXPMax = function () {
    var expBaseScale, difference = this.lv - this.original.lv;//{{{

    if (difference < 0) {
      expBaseScale = expBaseScaleFactor[0];
    } else if (difference == 0) {
      expBaseScale = expBaseScaleFactor[1];
    } else if (difference >= 1 && difference < 9) {
      expBaseScale = expBaseScaleFactor[difference + 1];
    } else if (difference >= 9) {
      expBaseScale = expBaseScaleFactor[expBaseScaleFactor.length - 1];
    }

    return this.expMax = Math.floor(expTable[this.lv] * expBaseScale - 1);//}}}
  }


  /**
   * 属性にスキルによる変化があるかチェックします。
   * 変化のあるスキルを所持している場合、
   * 該当スキルIDを含んだ配列を返却します。
   * @return {Array} 属性変化スキルリスト
   */
  this.checkChangeAttr = function () {
    result = [];
    for (var i = 0; i < this.skill.length; i++) {
      var skillID = parseInt(this.skill[i]);
      if(isChangeAttr(skillID)){
        result.push(skillID);
      }
    };
    return result;
  }

  this.changeAttr = function () {
    if(this.skill){
      // 属性耐性が在るかにスキルを巡回
      for (var i = this.skill.length - 1; i >= 0; i--) {
        var registSkill;
        if(registSkill = this.getRegistSkillAttr(this.skill[i])){
          // 設定
          this.attr[registSkill.attrID] = registSkill.attrStrength;
        };
      };
    }
  };

  /**
   * 引数を元に耐性スキルの属性と強度を取得します。
   * 物 銃 火 氷 電 風 破 呪いずれかのIDと
   * 耐性/無効/反射/吸収のオブジェクトが返却されます。
   * どれにも適合しなかった場合NULLが返却されます。
   *
   * @param  {Integer} skillID スキルID
   * @return {Object}          属性IDと属性強度IDが入ったオブジェクト
   *         オブジェクトメンバ
   *         attrID       物 銃 火 氷 電 風 破 呪いずれかのID
   *         attrStrength 耐性/無効/反射/吸収のオブジェクト
   */
  this.getRegistSkillAttr = function (skillID) {
    var skill = getSkill(skillID)

    var attrStrengthID;
    if(skill.name.match(/耐性/)){
      attrStrengthID =  3;
    } else if(skill.name.match(/無効/)){
      attrStrengthID =  4;
    } else if(skill.name.match(/反射/)){
      attrStrengthID =  5;
    } else if(skill.name.match(/吸収/)){
      attrStrengthID =  6;
    }

    var attrID;
    if(skill.name.match(/物理/)){
      attrID =  0;
    } else if(skill.name.match(/銃/)){
      attrID =  1;
    } else if(skill.name.match(/火炎/)){
      attrID =  2;
    } else if(skill.name.match(/氷結/)){
      attrID =  3;
    } else if(skill.name.match(/電撃/)){
      attrID =  4;
    } else if(skill.name.match(/疾風/)){
      attrID =  5;
    } else if(skill.name.match(/破魔/)){
      attrID =  6;
    } else if(skill.name.match(/呪殺/)){
      attrID =  7;
    }

    return attrID === 0 || attrStrengthID && attrID ?
      {attrID:attrID,attrStrength:getAttr(attrStrengthID)} :
      null;
  }

  /**
   * 属性変化があるスキルIDかチェックします。
   * @return {Boolean} 変化可否
   */
  function isChangeAttr(skillID){
    return skillID >= 351 &&  skillID <= 378
  }

  /**
   * 活泉・魔脈スキルによるHP・MPの増加分%を返します。
   */
  function getHPMPupPercent(skillID) {
    //{{{
    switch (parseInt(skillID)) {
      case 414:
        return {"target":"hp", "percent":0.1};
      case 417:
        return {"target":"mp", "percent":0.1};
      case 415:
        return {"target":"hp", "percent":0.2};
      case 418:
        return {"target":"mp", "percent":0.2};
      case 416:
        return {"target":"hp", "percent":0.3};
      case 419:
        return {"target":"mp", "percent":0.3};
    }
    return {"target":"none", "percent":0};
  }
  //}}}

  /**
   * HPMPの増量係数を算出します。
   */
  function calcHPMPPercent(skillList) {
    //{{{
    var result = {"totalHPPercent":1, "totalMPPercent":1};

    for (var i = 0, len = skillList.length; i < len; i++) {
      var upPercent = getHPMPupPercent(skillList[i]);
      switch (upPercent.target) {
        case "hp":
          result.totalHPPercent = result.totalHPPercent + upPercent.percent;
          break;
        case "mp":
          result.totalMPPercent = result.totalMPPercent + upPercent.percent;
          break;
      }
    }
    ;
    return result;
  }
  //}}}

  /*
   *
   */
  this.calculateHP = function(lv, vit, addNum, upHPPercent, skillList) {
    //{{{
    var resultHP = Math.floor(
      this.lv * 6 + this.vit * 3 * devil.baseHP / 100 + devil.addHP
    );
    resultHP = Math.floor(
      resultHP * calcHPMPPercent(this.skill).totalHPPercent
    );

    if (resultHP > 999) {
      resultHP = 999;
    }
    return this.HP = resultHP;
  }
  //}}}
  this.calculateMP = function () {
    //{{{
    var resultMP = Math.floor(
      this.lv * 3 + this.int * 2 * devil.baseMP / 100 + devil.addMP
    );
    resultMP = Math.floor(
      resultMP * calcHPMPPercent(this.skill).totalMPPercent
    );
    if (resultMP > 999) {
      resultMP = 999;
    }
    return this.MP = resultMP;
  }
  //}}}

  /**
   * 悪魔が元々持っているスキルか判別します。
   *
   * @param {String} skillID
   */
  this.isDefaultSkill = function (skillID) {
    var defaultSkillList = this.original.skill;//{{{
    for (var i = 0, len = defaultSkillList.length; i < len; i++) {
      if (skillID == defaultSkillList[i]) {
        return true;
      }
    }
    return false;//}}}
  };

  /**
   * 召喚に必要なコストを算出します。
   * ステータス・スキルが正しく設定されている必要があります。
   */
  this.calculateCost = function () {
    //{{{

    this.calculateMaxSkillCost();
    var statusCost =
      parseInt(this.str) +
        parseInt(this.agi) +
        parseInt(this.vit) +
        parseInt(this.int) +
        parseInt(this.luc);

    var baseCost = Math.floor(Math.pow(statusCost, 3)
      * this.devilCost % Math.pow(2, 32) / 1000);
    return this.totalCost = Math.floor(
      (this.maxSkillCost + baseCost + 1300) * 3 / 4
    );
  }
  //}}}

  // この悪魔の複製を返す。
  Devil.prototype.clone = function () {
    //{{{
    var clone = new Devil(this);

    clone.attr = this.attr.slice(0);
    clone.skill = this.skill.slice(0);

    clone.original = this;

    return clone;
  }
  //}}}

  // この悪魔の文字列表現を返す。(簡易)
  this.toString = function () {
    //{{{
    var enemyExclusive = this.playerUses ? "" : "（？）"
    return "" + this.devilID +
      ":[" + this.genus.toString() + "]" +
      this.name + enemyExclusive;
  }
  //}}}

  // この悪魔の文字列表現を返す。(詳細)
  this.toDetailString = function () {
    //{{{
    return this.toString();
  }
  //}}}

  // この悪魔の情報を返す。(簡易)
  this.getSimpleInformation = function () {
    //{{{
    var msg = "";

    msg += "【" + this.toString() + "】";
    msg += "\n";
    this.calculateCost();
    msg += " COST:" + addComma(this.totalCost);
    msg += " 100%時:" + addComma(Math.floor(this.totalCost / 2));
    msg += " 最大スキル:" + addComma(this.maxSkillCost);
    msg += "\n";

    msg += "■ステータス";
    msg += "\n";

    msg += "Lv:" + this.lv;
    msg += " 経験値:" + this.exp;
    msg += "\n";

    msg += "HP:" + this.HP + " MP:" + this.MP;
    msg += "\n";

    msg += "力:" + this.str + "(" + this.strBase + ")";
    msg += " 魔:" + this.int + "(" + this.intBase + ")";
    msg += " 体:" + this.vit + "(" + this.vitBase + ")";
    msg += " 速:" + this.agi + "(" + this.agiBase + ")";
    msg += " 運:" + this.luc + "(" + this.lucBase + ")";
    msg += "\n";

    msg += "■属性 : "
    msg += "\n";
    msg += "物銃火氷電風破呪"
    msg += "\n";
    msg += this.attr[0].name;
    msg += this.attr[1].name;
    msg += this.attr[2].name;
    msg += this.attr[3].name;
    msg += this.attr[4].name;
    msg += this.attr[5].name;
    msg += this.attr[6].name;
    msg += this.attr[7].name;
    msg += "\n";

    msg += "■スキル : "
    msg += "\n";
    msg += "[1]:" + getSkill(this.skill[0]);
    msg += " [2]:" + getSkill(this.skill[1]);
    msg += " [3]:" + getSkill(this.skill[2]);
    msg += "\n";
    msg += "[4]:" + getSkill(this.skill[3]);
    msg += " [5]:" + getSkill(this.skill[4]);
    msg += " [6]:" + getSkill(this.skill[5]);
    msg += "\n";

    msg += "■パスワード : "
    msg += "\n";
    msg += generatePassword(this);

    return msg;
  }
  //}}}

  // この悪魔の情報を返す。(詳細)
  this.getDetailInformation = function () {
    return this.getSimpleInformation();//{{{
  }
  //}}}
  //}}}
}
// 該当する属性耐性を返す
function getAttr(attrID) {//{{{
  // 属性
  var attrMap = [];
  attrMap[0] = {'id':0,'key':'enigma','name': "？"}
  attrMap[1] = {'id':1,'key':'none','name': "－"}
  attrMap[2] = {'id':2,'key':'weakpoint','name': "弱"}
  attrMap[3] = {'id':3,'key':'regists','name': "耐"}
  attrMap[4] = {'id':4,'key':'null','name': "無"}
  attrMap[5] = {'id':5,'key':'reflect','name': "反"}
  attrMap[6] = {'id':6,'key':'drain','name': "吸"}

  return (attrMap[attrID]);
}//}}}

// 該当する種族を返す
function getGenus(genusID) {//{{{
  return (genusMap[genusID]);
}//}}}

// 該当するスキルを返す
function getSkill(skillID) {//{{{
  return (skillMap[skillID]);
}//}}}

var devilJSON = {
  //{{{
  "1":{    "attr":[3, 3, 6, 2, 1, 1, 4, 3], "id":1, "genusID":1, "name":"セラフ", "devilCost":38, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[40, 43, 107, 0, 0, 0], "lvDefault":89, "strDefault":52, "intDefault":64, "vitDefault":57, "agiDefault":55, "lucDefault":59, "playerUses":true },
  "2":{    "attr":[1, 4, 3, 3, 3, 3, 4, 1], "id":2, "genusID":1, "name":"メタトロン", "devilCost":22, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[39, 62, 121, 0, 0, 0], "lvDefault":84, "strDefault":57, "intDefault":54, "vitDefault":55, "agiDefault":48, "lucDefault":53, "playerUses":true },
  "3":{    "attr":[1, 1, 1, 1, 3, 2, 4, 3], "id":3, "genusID":1, "name":"スラオシャ", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[43, 103, 397, 0, 0, 0], "lvDefault":74, "strDefault":50, "intDefault":44, "vitDefault":43, "agiDefault":53, "lucDefault":47, "playerUses":true },
  "4":{    "attr":[1, 1, 1, 2, 1, 1, 4, 4], "id":4, "genusID":1, "name":"アズラエル", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[8, 54, 119, 0, 0, 0], "lvDefault":69, "strDefault":45, "intDefault":49, "vitDefault":41, "agiDefault":40, "lucDefault":47, "playerUses":true },
  "5":{    "attr":[1, 1, 2, 6, 1, 1, 4, 3], "id":5, "genusID":1, "name":"イスラフィール", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[51, 120, 366, 0, 0, 0], "lvDefault":63, "strDefault":38, "intDefault":46, "vitDefault":37, "agiDefault":43, "lucDefault":40, "playerUses":true },
  "6":{    "attr":[1, 4, 1, 1, 2, 1, 4, 4], "id":6, "genusID":1, "name":"ヴィクター", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[37, 185, 376, 0, 0, 0], "lvDefault":51, "strDefault":37, "intDefault":29, "vitDefault":35, "agiDefault":31, "lucDefault":36, "playerUses":true },
  "7":{    "attr":[1, 1, 1, 1, 4, 2, 4, 3], "id":7, "genusID":1, "name":"ハニエル", "devilCost":23, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[21, 61, 103, 0, 0, 0], "lvDefault":79, "strDefault":50, "intDefault":53, "vitDefault":47, "agiDefault":53, "lucDefault":49, "playerUses":true },
  "8":{    "attr":[1, 1, 1, 1, 2, 4, 4, 3], "id":8, "genusID":1, "name":"カズフェル", "devilCost":23, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[30, 142, 162, 0, 0, 0], "lvDefault":66, "strDefault":42, "intDefault":40, "vitDefault":46, "agiDefault":41, "lucDefault":44, "playerUses":true },
  "9":{    "attr":[1, 1, 5, 1, 1, 1, 4, 4], "id":9, "genusID":2, "name":"アマテラス", "devilCost":18, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[6, 106, 129, 0, 0, 0], "lvDefault":79, "strDefault":48, "intDefault":52, "vitDefault":51, "agiDefault":50, "lucDefault":56, "playerUses":true },
  "10":{   "attr":[1, 1, 1, 1, 2, 1, 4, 1], "id":10, "genusID":2, "name":"ラクシュミ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[103, 147, 394, 0, 0, 0], "lvDefault":73, "strDefault":40, "intDefault":49, "vitDefault":43, "agiDefault":47, "lucDefault":55, "playerUses":true },
  "11":{   "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":11, "genusID":2, "name":"ノルン", "devilCost":24, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[117, 145, 401, 0, 0, 0], "lvDefault":72, "strDefault":46, "intDefault":49, "vitDefault":46, "agiDefault":44, "lucDefault":51, "playerUses":true },
  "12":{   "attr":[1, 1, 1, 6, 1, 1, 3, 4], "id":12, "genusID":2, "name":"トラソルテオトル", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[14, 120, 138, 0, 0, 0], "lvDefault":64, "strDefault":40, "intDefault":46, "vitDefault":41, "agiDefault":38, "lucDefault":42, "playerUses":true },
  "13":{   "attr":[3, 5, 1, 1, 1, 1, 4, 2], "id":13, "genusID":2, "name":"パラスアテナ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[140, 153, 397, 0, 0, 0], "lvDefault":53, "strDefault":37, "intDefault":30, "vitDefault":36, "agiDefault":39, "lucDefault":32, "playerUses":true },
  "14":{   "attr":[1, 3, 1, 1, 2, 4, 1, 4], "id":14, "genusID":2, "name":"スカアハ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[30, 131, 185, 0, 0, 0], "lvDefault":43, "strDefault":34, "intDefault":25, "vitDefault":30, "agiDefault":32, "lucDefault":23, "playerUses":true },
  "15":{   "attr":[1, 1, 1, 1, 1, 1, 4, 1], "id":15, "genusID":2, "name":"パールヴァティ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[37, 105, 0, 0, 0, 0], "lvDefault":32, "strDefault":20, "intDefault":25, "vitDefault":21, "agiDefault":22, "lucDefault":23, "playerUses":true },
  "16":{   "attr":[1, 1, 1, 1, 2, 3, 3, 1], "id":16, "genusID":2, "name":"フォルトゥナ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[31, 105, 122, 0, 0, 0], "lvDefault":20, "strDefault":12, "intDefault":17, "vitDefault":13, "agiDefault":15, "lucDefault":18, "playerUses":true },
  "17":{   "attr":[2, 2, 1, 1, 1, 1, 1, 1], "id":17, "genusID":2, "name":"ハトホル", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[31, 104, 0, 0, 0, 0], "lvDefault":11, "strDefault":9, "intDefault":12, "vitDefault":8, "agiDefault":9, "lucDefault":10, "playerUses":true },
  "18":{   "attr":[1, 1, 1, 1, 1, 6, 4, 2], "id":18, "genusID":2, "name":"イシュタル", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[117, 131, 147, 0, 0, 0], "lvDefault":51, "strDefault":33, "intDefault":38, "vitDefault":33, "agiDefault":34, "lucDefault":35, "playerUses":true },
  "19":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":19, "genusID":2, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "20":{   "attr":[1, 2, 5, 2, 1, 4, 3, 1], "id":20, "genusID":3, "name":"ガルーダ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[30, 117, 168, 0, 0, 0], "lvDefault":71, "strDefault":44, "intDefault":43, "vitDefault":40, "agiDefault":52, "lucDefault":49, "playerUses":true },
  "21":{   "attr":[1, 2, 6, 2, 1, 1, 4, 1], "id":21, "genusID":3, "name":"ヤタガラス", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[6, 109, 122, 0, 0, 0], "lvDefault":59, "strDefault":37, "intDefault":38, "vitDefault":35, "agiDefault":43, "lucDefault":39, "playerUses":true },
  "22":{   "attr":[1, 2, 4, 2, 1, 1, 4, 1], "id":22, "genusID":3, "name":"スザク", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[7, 382, 0, 0, 0, 0], "lvDefault":46, "strDefault":34, "intDefault":27, "vitDefault":30, "agiDefault":33, "lucDefault":29, "playerUses":true },
  "23":{   "attr":[1, 2, 1, 1, 5, 1, 1, 1], "id":23, "genusID":3, "name":"サンダーバード", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[23, 173, 385, 0, 0, 0], "lvDefault":35, "strDefault":26, "intDefault":21, "vitDefault":22, "agiDefault":28, "lucDefault":23, "playerUses":true },
  "24":{   "attr":[1, 2, 6, 2, 1, 1, 4, 4], "id":24, "genusID":3, "name":"フェニックス", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[7, 118, 0, 0, 0, 0], "lvDefault":25, "strDefault":15, "intDefault":22, "vitDefault":14, "agiDefault":19, "lucDefault":20, "playerUses":true },
  "25":{   "attr":[1, 2, 3, 1, 1, 4, 1, 1], "id":25, "genusID":3, "name":"スパルナ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[29, 387, 0, 0, 0, 0], "lvDefault":15, "strDefault":11, "intDefault":12, "vitDefault":9, "agiDefault":15, "lucDefault":13, "playerUses":true },
  "26":{   "attr":[1, 2, 1, 1, 3, 2, 1, 1], "id":26, "genusID":3, "name":"ハンサ", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[22, 75, 125, 0, 0, 0], "lvDefault":9, "strDefault":6, "intDefault":9, "vitDefault":9, "agiDefault":10, "lucDefault":8, "playerUses":true },
  "27":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":27, "genusID":3, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "28":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":28, "genusID":3, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "29":{   "attr":[1, 6, 2, 1, 1, 1, 1, 1], "id":29, "genusID":4, "name":"イグドラジル", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[125, 182, 358, 0, 0, 0], "lvDefault":64, "strDefault":46, "intDefault":39, "vitDefault":50, "agiDefault":35, "lucDefault":42, "playerUses":true },
  "30":{   "attr":[1, 3, 2, 1, 1, 1, 4, 4], "id":30, "genusID":4, "name":"ハオマ", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[103, 141, 184, 0, 0, 0], "lvDefault":55, "strDefault":36, "intDefault":41, "vitDefault":35, "agiDefault":30, "lucDefault":38, "playerUses":true },
  "31":{   "attr":[1, 3, 2, 1, 3, 1, 3, 3], "id":31, "genusID":4, "name":"ククノチ", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[116, 121, 182, 0, 0, 0], "lvDefault":44, "strDefault":28, "intDefault":35, "vitDefault":26, "agiDefault":30, "lucDefault":28, "playerUses":true },
  "32":{   "attr":[2, 3, 2, 1, 1, 1, 1, 1], "id":32, "genusID":4, "name":"マヤウェル", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[109, 118, 394, 0, 0, 0], "lvDefault":35, "strDefault":22, "intDefault":28, "vitDefault":20, "agiDefault":26, "lucDefault":24, "playerUses":true },
  "33":{   "attr":[1, 1, 2, 1, 1, 1, 3, 3], "id":33, "genusID":4, "name":"ダフネ", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[113, 123, 125, 0, 0, 0], "lvDefault":21, "strDefault":13, "intDefault":21, "vitDefault":12, "agiDefault":16, "lucDefault":16, "playerUses":true },
  "34":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":34, "genusID":4, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "35":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":35, "genusID":4, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "36":{   "attr":[1, 1, 1, 1, 2, 5, 4, 1], "id":36, "genusID":5, "name":"ケルプ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[38, 61, 186, 0, 0, 0], "lvDefault":61, "strDefault":38, "intDefault":44, "vitDefault":36, "agiDefault":38, "lucDefault":37, "playerUses":true },
  "37":{   "attr":[1, 1, 4, 2, 1, 1, 4, 1], "id":37, "genusID":5, "name":"ソロネ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[3, 61, 105, 0, 0, 0], "lvDefault":47, "strDefault":26, "intDefault":39, "vitDefault":27, "agiDefault":29, "lucDefault":30, "playerUses":true },
  "38":{   "attr":[1, 1, 1, 1, 1, 2, 4, 2], "id":38, "genusID":5, "name":"ドミニオン", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[37, 60, 120, 0, 0, 0], "lvDefault":38, "strDefault":28, "intDefault":30, "vitDefault":22, "agiDefault":20, "lucDefault":24, "playerUses":true },
  "39":{   "attr":[1, 1, 1, 1, 2, 3, 4, 2], "id":39, "genusID":5, "name":"ヴァーチャー", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[29, 59, 118, 0, 0, 0], "lvDefault":25, "strDefault":13, "intDefault":22, "vitDefault":15, "agiDefault":19, "lucDefault":16, "playerUses":true },
  "40":{   "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":40, "genusID":5, "name":"パワー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[60, 181, 0, 0, 0, 0], "lvDefault":19, "strDefault":18, "intDefault":11, "vitDefault":13, "agiDefault":13, "lucDefault":12, "playerUses":true },
  "41":{   "attr":[1, 2, 1, 1, 1, 2, 4, 2], "id":41, "genusID":5, "name":"プリンシパリティ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[20, 58, 0, 0, 0, 0], "lvDefault":14, "strDefault":11, "intDefault":13, "vitDefault":11, "agiDefault":9, "lucDefault":8, "playerUses":true },
  "42":{   "attr":[1, 1, 1, 1, 2, 1, 4, 2], "id":42, "genusID":5, "name":"アークエンジェル", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[58, 157, 0, 0, 0, 0], "lvDefault":8, "strDefault":9, "intDefault":8, "vitDefault":7, "agiDefault":5, "lucDefault":5, "playerUses":true },
  "43":{   "attr":[1, 2, 1, 1, 1, 1, 4, 2], "id":43, "genusID":5, "name":"エンジェル", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[58, 101, 0, 0, 0, 0], "lvDefault":4, "strDefault":3, "intDefault":7, "vitDefault":5, "agiDefault":4, "lucDefault":3, "playerUses":true },
  "44":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":44, "genusID":5, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "45":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":45, "genusID":5, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "46":{   "attr":[1, 2, 1, 1, 1, 4, 1, 1], "id":46, "genusID":6, "name":"タイホウ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[33, 393, 0, 0, 0, 0], "lvDefault":50, "strDefault":34, "intDefault":31, "vitDefault":26, "agiDefault":39, "lucDefault":30, "playerUses":true },
  "47":{   "attr":[1, 3, 2, 1, 1, 1, 1, 1], "id":47, "genusID":6, "name":"ルフ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[14, 113, 165, 0, 0, 0], "lvDefault":42, "strDefault":24, "intDefault":24, "vitDefault":29, "agiDefault":34, "lucDefault":25, "playerUses":true },
  "48":{   "attr":[1, 2, 1, 1, 2, 1, 1, 1], "id":48, "genusID":6, "name":"タンガタ・マヌ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[10, 180, 0, 0, 0, 0], "lvDefault":2, "strDefault":3, "intDefault":2, "vitDefault":2, "agiDefault":5, "lucDefault":4, "playerUses":true },
  "49":{   "attr":[1, 2, 1, 1, 1, 1, 1, 1], "id":49, "genusID":6, "name":"カラドリウス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[109, 113, 140, 0, 0, 0], "lvDefault":22, "strDefault":12, "intDefault":17, "vitDefault":13, "agiDefault":19, "lucDefault":15, "playerUses":true },
  "50":{   "attr":[1, 1, 2, 1, 1, 2, 1, 1], "id":50, "genusID":6, "name":"コカクチョウ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[49, 128, 0, 0, 0, 0], "lvDefault":15, "strDefault":10, "intDefault":9, "vitDefault":9, "agiDefault":16, "lucDefault":11, "playerUses":true },
  "51":{   "attr":[1, 2, 1, 1, 2, 1, 1, 1], "id":51, "genusID":6, "name":"ハーピー", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[31, 112, 122, 0, 0, 0], "lvDefault":9, "strDefault":6, "intDefault":6, "vitDefault":6, "agiDefault":12, "lucDefault":7, "playerUses":true },
  "52":{   "attr":[1, 2, 2, 3, 1, 3, 1, 1], "id":52, "genusID":6, "name":"タクヒ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[34, 127, 0, 0, 0, 0], "lvDefault":31, "strDefault":18, "intDefault":18, "vitDefault":20, "agiDefault":27, "lucDefault":20, "playerUses":true },
  "53":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":53, "genusID":6, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "54":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":54, "genusID":6, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "55":{   "attr":[3, 1, 1, 1, 2, 5, 4, 1], "id":55, "genusID":7, "name":"ガネーシャ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[35, 373, 389, 0, 0, 0], "lvDefault":67, "strDefault":47, "intDefault":41, "vitDefault":45, "agiDefault":37, "lucDefault":41, "playerUses":true },
  "56":{   "attr":[1, 4, 4, 2, 1, 1, 1, 4], "id":56, "genusID":7, "name":"シウテクトリ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[6, 182, 0, 0, 0, 0], "lvDefault":54, "strDefault":34, "intDefault":34, "vitDefault":35, "agiDefault":38, "lucDefault":31, "playerUses":true },
  "57":{   "attr":[3, 1, 2, 1, 1, 1, 3, 3], "id":57, "genusID":7, "name":"ヴァルキリー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[139, 144, 153, 0, 0, 0], "lvDefault":45, "strDefault":33, "intDefault":26, "vitDefault":30, "agiDefault":30, "lucDefault":26, "playerUses":true },
  "58":{   "attr":[3, 3, 1, 2, 1, 1, 1, 1], "id":58, "genusID":7, "name":"シワンナ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[4, 109, 130, 0, 0, 0], "lvDefault":37, "strDefault":19, "intDefault":30, "vitDefault":25, "agiDefault":23, "lucDefault":24, "playerUses":true },
  "59":{   "attr":[1, 2, 1, 1, 3, 3, 1, 1], "id":59, "genusID":7, "name":"ディース", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[32, 75, 0, 0, 0, 0], "lvDefault":27, "strDefault":16, "intDefault":23, "vitDefault":16, "agiDefault":18, "lucDefault":18, "playerUses":true },
  "60":{   "attr":[1, 1, 5, 2, 2, 3, 4, 1], "id":60, "genusID":7, "name":"カラステング", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[34, 58, 0, 0, 0, 0], "lvDefault":18, "strDefault":10, "intDefault":12, "vitDefault":13, "agiDefault":16, "lucDefault":13, "playerUses":true },
  "61":{   "attr":[1, 1, 1, 3, 3, 2, 1, 1], "id":61, "genusID":7, "name":"ヴォジャノーイ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[22, 180, 0, 0, 0, 0], "lvDefault":13, "strDefault":9, "intDefault":13, "vitDefault":10, "agiDefault":9, "lucDefault":8, "playerUses":true },
  "62":{   "attr":[1, 2, 1, 1, 1, 1, 1, 1], "id":62, "genusID":7, "name":"コッパテング", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[28, 121, 0, 0, 0, 0], "lvDefault":5, "strDefault":3, "intDefault":6, "vitDefault":5, "agiDefault":7, "lucDefault":4, "playerUses":true },
  "63":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":63, "genusID":7, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "64":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":64, "genusID":7, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "65":{   "attr":[1, 1, 6, 2, 1, 1, 4, 1], "id":65, "genusID":8, "name":"ペリ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[103, 111, 397, 0, 0, 0], "lvDefault":59, "strDefault":35, "intDefault":44, "vitDefault":34, "agiDefault":34, "lucDefault":40, "playerUses":true },
  "66":{   "attr":[1, 1, 2, 4, 1, 1, 4, 3], "id":66, "genusID":8, "name":"サラスヴァティ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[15, 105, 119, 0, 0, 0], "lvDefault":48, "strDefault":29, "intDefault":35, "vitDefault":28, "agiDefault":26, "lucDefault":36, "playerUses":true },
  "67":{   "attr":[1, 1, 1, 1, 2, 1, 4, 1], "id":67, "genusID":8, "name":"センリ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[32, 105, 190, 0, 0, 0], "lvDefault":36, "strDefault":18, "intDefault":26, "vitDefault":22, "agiDefault":25, "lucDefault":27, "playerUses":true },
  "68":{   "attr":[1, 1, 1, 1, 1, 1, 4, 1], "id":68, "genusID":8, "name":"アメノウズメ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[131, 146, 0, 0, 0, 0], "lvDefault":24, "strDefault":13, "intDefault":16, "vitDefault":15, "agiDefault":16, "lucDefault":22, "playerUses":true },
  "69":{   "attr":[1, 1, 2, 1, 1, 1, 1, 1], "id":69, "genusID":8, "name":"アプサラス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[10, 64, 101, 0, 0, 0], "lvDefault":10, "strDefault":5, "intDefault":10, "vitDefault":6, "agiDefault":7, "lucDefault":12, "playerUses":true },
  "70":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":70, "genusID":8, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "71":{   "attr":[1, 1, 3, 3, 3, 3, 4, 4], "id":71, "genusID":9, "name":"デミウルゴス", "devilCost":51, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[41, 124, 395, 0, 0, 0], "lvDefault":94, "strDefault":66, "intDefault":64, "vitDefault":59, "agiDefault":60, "lucDefault":53, "playerUses":true },
  "72":{   "attr":[1, 1, 1, 2, 4, 4, 1, 4], "id":72, "genusID":9, "name":"セト", "devilCost":23, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[72, 133, 168, 0, 0, 0], "lvDefault":85, "strDefault":59, "intDefault":55, "vitDefault":54, "agiDefault":53, "lucDefault":49, "playerUses":true },
  "73":{   "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":73, "genusID":9, "name":"サマエル", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[38, 103, 119, 0, 0, 0], "lvDefault":75, "strDefault":53, "intDefault":48, "vitDefault":47, "agiDefault":44, "lucDefault":46, "playerUses":true },
  "74":{   "attr":[1, 1, 2, 3, 1, 1, 4, 4], "id":74, "genusID":9, "name":"パレス", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[15, 125, 399, 0, 0, 0], "lvDefault":68, "strDefault":39, "intDefault":48, "vitDefault":42, "agiDefault":41, "lucDefault":44, "playerUses":true },
  "75":{   "attr":[4, 4, 2, 2, 2, 2, 1, 4], "id":75, "genusID":9, "name":"トウテツ", "devilCost":16, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[171, 380, 0, 0, 0, 0], "lvDefault":53, "strDefault":39, "intDefault":33, "vitDefault":30, "agiDefault":35, "lucDefault":32, "playerUses":true },
  "76":{   "attr":[1, 1, 1, 1, 2, 1, 4, 4], "id":76, "genusID":9, "name":"パチャカマク", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[32, 115, 143, 0, 0, 0], "lvDefault":48, "strDefault":30, "intDefault":30, "vitDefault":28, "agiDefault":30, "lucDefault":36, "playerUses":true },
  "77":{   "attr":[1, 1, 1, 2, 3, 3, 4, 4], "id":77, "genusID":9, "name":"ミシャグジさま", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[23, 135, 0, 0, 0, 0], "lvDefault":39, "strDefault":25, "intDefault":28, "vitDefault":19, "agiDefault":30, "lucDefault":25, "playerUses":true },
  "78":{   "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":78, "genusID":9, "name":"バフォメット", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[55, 134, 0, 0, 0, 0], "lvDefault":26, "strDefault":14, "intDefault":23, "vitDefault":15, "agiDefault":19, "lucDefault":17, "playerUses":true },
  "79":{   "attr":[2, 2, 1, 3, 1, 3, 2, 4], "id":79, "genusID":9, "name":"アルシエル", "devilCost":18, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[162, 391, 415, 0, 0, 0], "lvDefault":61, "strDefault":43, "intDefault":42, "vitDefault":40, "agiDefault":39, "lucDefault":39, "playerUses":true },
  "80":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":80, "genusID":9, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "81":{   "attr":[1, 2, 2, 5, 1, 5, 1, 1], "id":81, "genusID":10, "name":"フレスベルグ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[16, 30, 165, 0, 0, 0], "lvDefault":70, "strDefault":38, "intDefault":46, "vitDefault":43, "agiDefault":51, "lucDefault":42, "playerUses":true },
  "82":{   "attr":[1, 2, 6, 2, 1, 1, 1, 1], "id":82, "genusID":10, "name":"カウ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[7, 46, 114, 0, 0, 0], "lvDefault":64, "strDefault":37, "intDefault":45, "vitDefault":38, "agiDefault":44, "lucDefault":38, "playerUses":true },
  "83":{   "attr":[1, 2, 1, 1, 6, 2, 4, 1], "id":83, "genusID":10, "name":"アンズー", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[21, 108, 165, 0, 0, 0], "lvDefault":49, "strDefault":31, "intDefault":30, "vitDefault":30, "agiDefault":39, "lucDefault":27, "playerUses":true },
  "84":{   "attr":[1, 2, 1, 1, 1, 1, 2, 4], "id":84, "genusID":10, "name":"グルル", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[30, 109, 178, 0, 0, 0], "lvDefault":40, "strDefault":23, "intDefault":27, "vitDefault":22, "agiDefault":33, "lucDefault":25, "playerUses":true },
  "85":{   "attr":[1, 2, 1, 2, 1, 1, 1, 3], "id":85, "genusID":10, "name":"チン", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[66, 179, 0, 0, 0, 0], "lvDefault":28, "strDefault":19, "intDefault":17, "vitDefault":18, "agiDefault":23, "lucDefault":17, "playerUses":true },
  "86":{   "attr":[3, 5, 1, 1, 2, 1, 1, 1], "id":86, "genusID":10, "name":"カマソッソ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[160, 175, 355, 0, 0, 0], "lvDefault":31, "strDefault":18, "intDefault":17, "vitDefault":22, "agiDefault":27, "lucDefault":19, "playerUses":true },
  "87":{   "attr":[1, 2, 1, 1, 2, 3, 1, 1], "id":87, "genusID":10, "name":"モー・ショボー", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[29, 101, 0, 0, 0, 0], "lvDefault":17, "strDefault":11, "intDefault":13, "vitDefault":10, "agiDefault":16, "lucDefault":11, "playerUses":true },
  "88":{   "attr":[1, 2, 1, 2, 1, 1, 1, 1], "id":88, "genusID":10, "name":"イツマデ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 127, 163, 0, 0, 0], "lvDefault":7, "strDefault":6, "intDefault":4, "vitDefault":7, "agiDefault":9, "lucDefault":5, "playerUses":true },
  "89":{   "attr":[1, 2, 1, 2, 1, 1, 1, 1], "id":89, "genusID":10, "name":"オンモラキ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 0, 0, 0, 0, 0], "lvDefault":3, "strDefault":3, "intDefault":3, "vitDefault":2, "agiDefault":6, "lucDefault":5, "playerUses":true },
  "90":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":90, "genusID":10, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "91":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":91, "genusID":10, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "92":{   "attr":[1, 5, 2, 1, 1, 1, 3, 4], "id":92, "genusID":11, "name":"アールキング", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[24, 192, 0, 0, 0, 0], "lvDefault":61, "strDefault":37, "intDefault":38, "vitDefault":42, "agiDefault":36, "lucDefault":40, "playerUses":true },
  "93":{   "attr":[1, 1, 2, 1, 1, 1, 1, 1], "id":93, "genusID":11, "name":"アルラウネ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[70, 112, 398, 0, 0, 0], "lvDefault":51, "strDefault":33, "intDefault":32, "vitDefault":35, "agiDefault":30, "lucDefault":33, "playerUses":true },
  "94":{   "attr":[1, 1, 2, 2, 1, 1, 1, 3], "id":94, "genusID":11, "name":"ザックーム", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[7, 68, 135, 0, 0, 0], "lvDefault":42, "strDefault":26, "intDefault":24, "vitDefault":33, "agiDefault":25, "lucDefault":28, "playerUses":true },
  "95":{   "attr":[1, 1, 2, 1, 1, 3, 3, 3], "id":95, "genusID":11, "name":"スクーグスロー", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[121, 184, 0, 0, 0, 0], "lvDefault":29, "strDefault":22, "intDefault":22, "vitDefault":16, "agiDefault":21, "lucDefault":16, "playerUses":true },
  "96":{   "attr":[1, 1, 2, 1, 1, 1, 1, 4], "id":96, "genusID":11, "name":"マンドレイク", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[68, 102, 111, 0, 0, 0], "lvDefault":22, "strDefault":13, "intDefault":17, "vitDefault":17, "agiDefault":11, "lucDefault":18, "playerUses":true },
  "97":{   "attr":[1, 1, 2, 1, 1, 1, 1, 1], "id":97, "genusID":11, "name":"サンショウ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[16, 396, 0, 0, 0, 0], "lvDefault":14, "strDefault":9, "intDefault":9, "vitDefault":14, "agiDefault":8, "lucDefault":12, "playerUses":true },
  "98":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":98, "genusID":11, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "99":{   "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":99, "genusID":11, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "100":{  "attr":[5, 5, 1, 1, 1, 1, 4, 4], "id":100, "genusID":12, "name":"ヴィシュヌ", "devilCost":22, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[39, 107, 183, 0, 0, 0], "lvDefault":86, "strDefault":51, "intDefault":60, "vitDefault":53, "agiDefault":54, "lucDefault":55, "playerUses":true },
  "101":{  "attr":[1, 1, 4, 1, 3, 2, 4, 4], "id":101, "genusID":12, "name":"ハチマン", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[24, 44, 139, 0, 0, 0], "lvDefault":77, "strDefault":50, "intDefault":59, "vitDefault":45, "agiDefault":47, "lucDefault":45, "playerUses":true },
  "102":{  "attr":[1, 5, 1, 3, 5, 2, 1, 1], "id":102, "genusID":12, "name":"オーディン", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[17, 26, 143, 0, 0, 0], "lvDefault":71, "strDefault":47, "intDefault":51, "vitDefault":47, "agiDefault":42, "lucDefault":41, "playerUses":true },
  "103":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":103, "genusID":12, "name":"オメテオトル", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[3, 12, 137, 0, 0, 0], "lvDefault":65, "strDefault":40, "intDefault":47, "vitDefault":38, "agiDefault":43, "lucDefault":42, "playerUses":true },
  "104":{  "attr":[3, 1, 6, 2, 1, 1, 3, 3], "id":104, "genusID":12, "name":"プロメテウス", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[38, 120, 138, 0, 0, 0], "lvDefault":57, "strDefault":42, "intDefault":32, "vitDefault":40, "agiDefault":36, "lucDefault":36, "playerUses":true },
  "105":{  "attr":[1, 1, 3, 2, 3, 1, 3, 1], "id":105, "genusID":12, "name":"インティ", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[5, 23, 102, 0, 0, 0], "lvDefault":49, "strDefault":38, "intDefault":31, "vitDefault":33, "agiDefault":26, "lucDefault":34, "playerUses":true },
  "106":{  "attr":[2, 2, 1, 4, 4, 6, 1, 1], "id":106, "genusID":12, "name":"トート", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[121, 126, 140, 0, 0, 0], "lvDefault":41, "strDefault":23, "intDefault":30, "vitDefault":24, "agiDefault":32, "lucDefault":29, "playerUses":true },
  "107":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":107, "genusID":12, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "108":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":108, "genusID":12, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "109":{  "attr":[3, 1, 1, 1, 1, 1, 4, 4], "id":109, "genusID":13, "name":"バロン", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[153, 169, 389, 0, 0, 0], "lvDefault":69, "strDefault":50, "intDefault":39, "vitDefault":45, "agiDefault":44, "lucDefault":44, "playerUses":true },
  "110":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":110, "genusID":13, "name":"アヌビス", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[56, 62, 119, 0, 0, 0], "lvDefault":61, "strDefault":35, "intDefault":44, "vitDefault":38, "agiDefault":39, "lucDefault":42, "playerUses":true },
  "111":{  "attr":[3, 1, 4, 2, 4, 1, 1, 1], "id":111, "genusID":13, "name":"キマイラ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[25, 164, 385, 0, 0, 0], "lvDefault":49, "strDefault":41, "intDefault":28, "vitDefault":33, "agiDefault":29, "lucDefault":31, "playerUses":true },
  "112":{  "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":112, "genusID":13, "name":"カイメイジュウ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[125, 141, 167, 0, 0, 0], "lvDefault":43, "strDefault":33, "intDefault":25, "vitDefault":30, "agiDefault":29, "lucDefault":27, "playerUses":true },
  "113":{  "attr":[3, 1, 4, 1, 1, 1, 4, 1], "id":113, "genusID":13, "name":"マカミ", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[139, 184, 351, 0, 0, 0], "lvDefault":32, "strDefault":29, "intDefault":19, "vitDefault":20, "agiDefault":23, "lucDefault":20, "playerUses":true },
  "114":{  "attr":[1, 1, 3, 2, 3, 2, 1, 1], "id":114, "genusID":13, "name":"カマプアア", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[67, 111, 151, 0, 0, 0], "lvDefault":24, "strDefault":21, "intDefault":18, "vitDefault":17, "agiDefault":14, "lucDefault":17, "playerUses":true },
  "115":{  "attr":[1, 1, 2, 1, 4, 1, 4, 1], "id":115, "genusID":13, "name":"シーサー", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[20, 133, 391, 0, 0, 0], "lvDefault":14, "strDefault":15, "intDefault":8, "vitDefault":12, "agiDefault":14, "lucDefault":8, "playerUses":true },
  "116":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":116, "genusID":13, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "117":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":117, "genusID":13, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "118":{  "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":118, "genusID":14, "name":"スフィンクス", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[106, 114, 189, 0, 0, 0], "lvDefault":70, "strDefault":40, "intDefault":48, "vitDefault":45, "agiDefault":48, "lucDefault":44, "playerUses":true },
  "119":{  "attr":[1, 2, 1, 1, 2, 1, 1, 1], "id":119, "genusID":14, "name":"スレイプニル", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[108, 124, 402, 0, 0, 0], "lvDefault":56, "strDefault":33, "intDefault":33, "vitDefault":33, "agiDefault":46, "lucDefault":38, "playerUses":true },
  "120":{  "attr":[1, 2, 1, 1, 6, 2, 4, 1], "id":120, "genusID":14, "name":"ビャッコ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[21, 386, 0, 0, 0, 0], "lvDefault":48, "strDefault":33, "intDefault":27, "vitDefault":29, "agiDefault":39, "lucDefault":31, "playerUses":true },
  "121":{  "attr":[1, 1, 2, 3, 3, 1, 4, 2], "id":121, "genusID":14, "name":"アイラーヴァタ", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[102, 111, 189, 0, 0, 0], "lvDefault":41, "strDefault":30, "intDefault":24, "vitDefault":25, "agiDefault":29, "lucDefault":30, "playerUses":true },
  "122":{  "attr":[1, 1, 1, 1, 1, 1, 4, 1], "id":122, "genusID":14, "name":"セイギュウカイ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[130, 154, 155, 0, 0, 0], "lvDefault":33, "strDefault":25, "intDefault":19, "vitDefault":22, "agiDefault":26, "lucDefault":22, "playerUses":true },
  "123":{  "attr":[1, 1, 1, 1, 2, 3, 1, 1], "id":123, "genusID":14, "name":"パピルサグ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[110, 181, 188, 0, 0, 0], "lvDefault":26, "strDefault":18, "intDefault":20, "vitDefault":16, "agiDefault":21, "lucDefault":18, "playerUses":true },
  "124":{  "attr":[1, 1, 1, 1, 1, 1, 3, 2], "id":124, "genusID":14, "name":"アピス", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[58, 130, 377, 0, 0, 0], "lvDefault":18, "strDefault":13, "intDefault":16, "vitDefault":14, "agiDefault":14, "lucDefault":12, "playerUses":true },
  "125":{  "attr":[1, 1, 1, 3, 3, 2, 1, 1], "id":125, "genusID":14, "name":"ヘケト", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[19, 101, 110, 0, 0, 0], "lvDefault":10, "strDefault":6, "intDefault":9, "vitDefault":10, "agiDefault":10, "lucDefault":10, "playerUses":true },
  "126":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":126, "genusID":14, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "127":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":127, "genusID":14, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "128":{  "attr":[1, 1, 2, 3, 1, 1, 4, 3], "id":128, "genusID":15, "name":"ヘイムダル", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[44, 51, 142, 0, 0, 0], "lvDefault":72, "strDefault":41, "intDefault":51, "vitDefault":43, "agiDefault":51, "lucDefault":45, "playerUses":true },
  "129":{  "attr":[3, 1, 1, 1, 1, 2, 4, 3], "id":129, "genusID":15, "name":"ハヌマーン", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[159, 389, 392, 0, 0, 0], "lvDefault":62, "strDefault":45, "intDefault":33, "vitDefault":37, "agiDefault":44, "lucDefault":42, "playerUses":true },
  "130":{  "attr":[3, 1, 1, 1, 2, 4, 3, 1], "id":130, "genusID":15, "name":"クー・フーリン", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[36, 143, 182, 0, 0, 0], "lvDefault":48, "strDefault":36, "intDefault":32, "vitDefault":34, "agiDefault":36, "lucDefault":26, "playerUses":true },
  "131":{  "attr":[1, 4, 1, 1, 1, 5, 4, 1], "id":131, "genusID":15, "name":"クラマテング", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[32, 60, 387, 0, 0, 0], "lvDefault":38, "strDefault":25, "intDefault":26, "vitDefault":27, "agiDefault":31, "lucDefault":25, "playerUses":true },
  "132":{  "attr":[1, 1, 3, 2, 3, 1, 1, 3], "id":132, "genusID":15, "name":"トラロック", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[5, 20, 0, 0, 0, 0], "lvDefault":40, "strDefault":25, "intDefault":32, "vitDefault":23, "agiDefault":28, "lucDefault":27, "playerUses":true },
  "133":{  "attr":[1, 1, 5, 5, 1, 1, 4, 1], "id":133, "genusID":15, "name":"フロストエース", "devilCost":30, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[12, 152, 383, 0, 0, 0], "lvDefault":34, "strDefault":27, "intDefault":25, "vitDefault":25, "agiDefault":25, "lucDefault":22, "playerUses":true },
  "134":{  "attr":[3, 3, 1, 1, 1, 1, 1, 2], "id":134, "genusID":15, "name":"タム・リン", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[112, 160, 190, 0, 0, 0], "lvDefault":29, "strDefault":22, "intDefault":17, "vitDefault":20, "agiDefault":24, "lucDefault":19, "playerUses":true },
  "135":{  "attr":[3, 1, 1, 1, 1, 1, 4, 1], "id":135, "genusID":15, "name":"クルースニク", "devilCost":18, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[59, 186, 394, 0, 0, 0], "lvDefault":55, "strDefault":40, "intDefault":38, "vitDefault":37, "agiDefault":37, "lucDefault":33, "playerUses":true },
  "136":{  "attr":[3, 3, 3, 1, 1, 1, 1, 1], "id":136, "genusID":16, "name":"デモニホ", "devilCost":12, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[340, 341, 342, 0, 0, 0], "lvDefault":75, "strDefault":52, "intDefault":41, "vitDefault":53, "agiDefault":44, "lucDefault":45, "playerUses":true },
  "137":{  "attr":[1, 2, 3, 3, 3, 3, 1, 1], "id":137, "genusID":16, "name":"ティターニア", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[24, 106, 0, 0, 0, 0], "lvDefault":60, "strDefault":32, "intDefault":47, "vitDefault":30, "agiDefault":40, "lucDefault":41, "playerUses":true },
  "138":{  "attr":[1, 1, 1, 1, 2, 3, 3, 3], "id":138, "genusID":16, "name":"オベロン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[30, 103, 0, 0, 0, 0], "lvDefault":50, "strDefault":28, "intDefault":36, "vitDefault":29, "agiDefault":34, "lucDefault":33, "playerUses":true },
  "139":{  "attr":[1, 1, 1, 3, 1, 1, 3, 3], "id":139, "genusID":16, "name":"ヴィヴィアン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[14, 70, 396, 0, 0, 0], "lvDefault":40, "strDefault":26, "intDefault":27, "vitDefault":25, "agiDefault":23, "lucDefault":29, "playerUses":true },
  "140":{  "attr":[3, 1, 1, 1, 3, 1, 2, 2], "id":140, "genusID":16, "name":"スプリガン", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[25, 125, 152, 0, 0, 0], "lvDefault":34, "strDefault":25, "intDefault":18, "vitDefault":26, "agiDefault":20, "lucDefault":23, "playerUses":true },
  "141":{  "attr":[1, 1, 2, 3, 1, 1, 1, 1], "id":141, "genusID":16, "name":"シルキー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 102, 114, 0, 0, 0], "lvDefault":23, "strDefault":14, "intDefault":20, "vitDefault":13, "agiDefault":15, "lucDefault":17, "playerUses":true },
  "142":{  "attr":[1, 1, 5, 2, 1, 1, 1, 1], "id":142, "genusID":16, "name":"ジャックランタン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 4, 0, 0, 0, 0], "lvDefault":16, "strDefault":9, "intDefault":15, "vitDefault":8, "agiDefault":11, "lucDefault":15, "playerUses":true },
  "143":{  "attr":[1, 1, 3, 3, 3, 1, 1, 1], "id":143, "genusID":16, "name":"ハイピクシー", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 104, 189, 0, 0, 0], "lvDefault":19, "strDefault":10, "intDefault":17, "vitDefault":10, "agiDefault":18, "lucDefault":17, "playerUses":true },
  "144":{  "attr":[1, 1, 2, 5, 1, 1, 1, 1], "id":144, "genusID":16, "name":"ジャックフロスト", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[10, 13, 170, 0, 0, 0], "lvDefault":12, "strDefault":5, "intDefault":12, "vitDefault":6, "agiDefault":11, "lucDefault":12, "playerUses":true },
  "145":{  "attr":[1, 1, 1, 1, 2, 1, 1, 1], "id":145, "genusID":16, "name":"ゴブリン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[121, 173, 0, 0, 0, 0], "lvDefault":7, "strDefault":8, "intDefault":3, "vitDefault":7, "agiDefault":4, "lucDefault":9, "playerUses":true },
  "146":{  "attr":[1, 1, 3, 1, 1, 1, 1, 1], "id":146, "genusID":16, "name":"ピクシー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 101, 0, 0, 0, 0], "lvDefault":2, "strDefault":2, "intDefault":3, "vitDefault":3, "agiDefault":3, "lucDefault":5, "playerUses":true },
  "147":{  "attr":[1, 1, 2, 3, 1, 1, 3, 3], "id":147, "genusID":16, "name":"ローレライ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[69, 104, 0, 0, 0, 0], "lvDefault":31, "strDefault":19, "intDefault":28, "vitDefault":19, "agiDefault":22, "lucDefault":20, "playerUses":true },
  "148":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":148, "genusID":16, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "149":{  "attr":[1, 1, 5, 2, 1, 1, 1, 4], "id":149, "genusID":17, "name":"ケルベロス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[3, 165, 392, 0, 0, 0], "lvDefault":66, "strDefault":45, "intDefault":37, "vitDefault":40, "agiDefault":44, "lucDefault":42, "playerUses":true },
  "150":{  "attr":[1, 1, 1, 2, 1, 1, 4, 4], "id":150, "genusID":17, "name":"アーマーン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[133, 153, 0, 0, 0, 0], "lvDefault":56, "strDefault":40, "intDefault":38, "vitDefault":37, "agiDefault":31, "lucDefault":32, "playerUses":true },
  "151":{  "attr":[1, 2, 3, 3, 3, 3, 1, 1], "id":151, "genusID":17, "name":"グリフォン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[108, 164, 167, 0, 0, 0], "lvDefault":46, "strDefault":29, "intDefault":26, "vitDefault":31, "agiDefault":36, "lucDefault":26, "playerUses":true },
  "152":{  "attr":[1, 1, 6, 2, 1, 1, 1, 1], "id":152, "genusID":17, "name":"オルトロス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[7, 164, 381, 0, 0, 0], "lvDefault":36, "strDefault":27, "intDefault":22, "vitDefault":21, "agiDefault":25, "lucDefault":23, "playerUses":true },
  "153":{  "attr":[1, 1, 2, 1, 1, 1, 1, 1], "id":153, "genusID":17, "name":"ショウジョウ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[174, 178, 393, 0, 0, 0], "lvDefault":30, "strDefault":23, "intDefault":17, "vitDefault":18, "agiDefault":22, "lucDefault":20, "playerUses":true },
  "154":{  "attr":[1, 1, 3, 2, 3, 1, 1, 3], "id":154, "genusID":17, "name":"ネコマタ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[2, 164, 392, 0, 0, 0], "lvDefault":22, "strDefault":17, "intDefault":10, "vitDefault":16, "agiDefault":19, "lucDefault":14, "playerUses":true },
  "155":{  "attr":[1, 1, 1, 1, 1, 2, 1, 4], "id":155, "genusID":17, "name":"イヌガミ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[128, 151, 398, 0, 0, 0], "lvDefault":17, "strDefault":10, "intDefault":11, "vitDefault":12, "agiDefault":15, "lucDefault":13, "playerUses":true },
  "156":{  "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":156, "genusID":17, "name":"カタキラウワ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[53, 101, 0, 0, 0, 0], "lvDefault":9, "strDefault":6, "intDefault":10, "vitDefault":10, "agiDefault":4, "lucDefault":7, "playerUses":true },
  "157":{  "attr":[1, 1, 3, 2, 1, 1, 1, 1], "id":157, "genusID":17, "name":"カソ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 0, 0, 0, 0, 0], "lvDefault":4, "strDefault":6, "intDefault":3, "vitDefault":4, "agiDefault":3, "lucDefault":6, "playerUses":true },
  "158":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":158, "genusID":17, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "159":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":159, "genusID":17, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "160":{  "attr":[3, 1, 2, 5, 6, 2, 1, 2], "id":160, "genusID":18, "name":"ゴグマゴグ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[25, 128, 391, 0, 0, 0], "lvDefault":55, "strDefault":39, "intDefault":31, "vitDefault":35, "agiDefault":32, "lucDefault":38, "playerUses":true },
  "161":{  "attr":[3, 1, 3, 2, 1, 1, 1, 1], "id":161, "genusID":18, "name":"トラルテクトリ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[111, 161, 170, 0, 0, 0], "lvDefault":45, "strDefault":32, "intDefault":23, "vitDefault":32, "agiDefault":24, "lucDefault":34, "playerUses":true },
  "162":{  "attr":[3, 3, 1, 1, 1, 1, 1, 1], "id":162, "genusID":18, "name":"ティターン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[123, 142, 155, 0, 0, 0], "lvDefault":35, "strDefault":24, "intDefault":19, "vitDefault":30, "agiDefault":19, "lucDefault":23, "playerUses":true },
  "163":{  "attr":[1, 1, 1, 1, 2, 2, 3, 4], "id":163, "genusID":18, "name":"カワンチャ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[66, 110, 111, 0, 0, 0], "lvDefault":25, "strDefault":17, "intDefault":17, "vitDefault":17, "agiDefault":17, "lucDefault":17, "playerUses":true },
  "164":{  "attr":[1, 1, 2, 1, 1, 1, 1, 1], "id":164, "genusID":18, "name":"スダマ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[13, 75, 0, 0, 0, 0], "lvDefault":15, "strDefault":8, "intDefault":8, "vitDefault":9, "agiDefault":15, "lucDefault":15, "playerUses":true },
  "165":{  "attr":[3, 3, 1, 1, 1, 1, 2, 1], "id":165, "genusID":18, "name":"ドワーフ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[123, 136, 151, 0, 0, 0], "lvDefault":20, "strDefault":17, "intDefault":11, "vitDefault":15, "agiDefault":10, "lucDefault":17, "playerUses":true },
  "166":{  "attr":[1, 1, 3, 2, 1, 2, 1, 1], "id":166, "genusID":18, "name":"カハク", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 4, 0, 0, 0, 0], "lvDefault":6, "strDefault":3, "intDefault":8, "vitDefault":2, "agiDefault":7, "lucDefault":8, "playerUses":true },
  "167":{  "attr":[1, 1, 2, 3, 1, 1, 1, 1], "id":167, "genusID":18, "name":"ノッカー", "devilCost":12, "baseHP":100, "HP":30, "baseMP":100, "MP":14, "skillDefault":[10, 0, 0, 0, 0, 0], "lvDefault":1, "strDefault":2, "intDefault":3, "vitDefault":3, "agiDefault":1, "lucDefault":4, "playerUses":true },
  "168":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":168, "genusID":18, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "169":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":169, "genusID":18, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "170":{  "attr":[1, 1, 1, 4, 4, 2, 4, 1], "id":170, "genusID":19, "name":"アナンタ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[63, 117, 396, 0, 0, 0], "lvDefault":65, "strDefault":45, "intDefault":40, "vitDefault":39, "agiDefault":41, "lucDefault":40, "playerUses":true },
  "171":{  "attr":[1, 1, 3, 4, 2, 1, 1, 1], "id":171, "genusID":19, "name":"ヤマタノオロチ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[12, 65, 133, 0, 0, 0], "lvDefault":60, "strDefault":42, "intDefault":39, "vitDefault":36, "agiDefault":37, "lucDefault":36, "playerUses":true },
  "172":{  "attr":[1, 1, 4, 3, 1, 1, 4, 1], "id":172, "genusID":19, "name":"ゲンブ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[12, 360, 0, 0, 0, 0], "lvDefault":42, "strDefault":30, "intDefault":25, "vitDefault":33, "agiDefault":22, "lucDefault":26, "playerUses":true },
  "173":{  "attr":[1, 1, 2, 3, 3, 1, 1, 3], "id":173, "genusID":19, "name":"ユルング", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[16, 102, 110, 0, 0, 0], "lvDefault":28, "strDefault":17, "intDefault":24, "vitDefault":17, "agiDefault":17, "lucDefault":19, "playerUses":true },
  "174":{  "attr":[1, 1, 1, 2, 1, 1, 1, 1], "id":174, "genusID":19, "name":"ヴィーヴル", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[5, 179, 0, 0, 0, 0], "lvDefault":33, "strDefault":19, "intDefault":21, "vitDefault":20, "agiDefault":26, "lucDefault":23, "playerUses":true },
  "175":{  "attr":[3, 3, 2, 2, 2, 2, 1, 1], "id":175, "genusID":19, "name":"ノズチ", "devilCost":10, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[123, 155, 0, 0, 0, 0], "lvDefault":18, "strDefault":17, "intDefault":11, "vitDefault":12, "agiDefault":10, "lucDefault":14, "playerUses":true },
  "176":{  "attr":[1, 1, 1, 1, 3, 2, 1, 1], "id":176, "genusID":19, "name":"ナーガ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[19, 151, 367, 0, 0, 0], "lvDefault":11, "strDefault":11, "intDefault":8, "vitDefault":10, "agiDefault":7, "lucDefault":7, "playerUses":true },
  "177":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":177, "genusID":19, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "178":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":178, "genusID":19, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "179":{  "attr":[1, 1, 3, 1, 2, 6, 1, 4], "id":179, "genusID":20, "name":"モト", "devilCost":23, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[33, 39, 374, 0, 0, 0], "lvDefault":87, "strDefault":48, "intDefault":62, "vitDefault":50, "agiDefault":55, "lucDefault":56, "playerUses":true },
  "180":{  "attr":[1, 1, 3, 2, 1, 1, 4, 4], "id":180, "genusID":20, "name":"ネルガル", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[54, 59, 186, 0, 0, 0], "lvDefault":76, "strDefault":50, "intDefault":47, "vitDefault":43, "agiDefault":50, "lucDefault":48, "playerUses":true },
  "181":{  "attr":[1, 1, 1, 1, 1, 1, 3, 4], "id":181, "genusID":20, "name":"ゲーデ", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[37, 54, 118, 0, 0, 0], "lvDefault":62, "strDefault":37, "intDefault":37, "vitDefault":38, "agiDefault":45, "lucDefault":39, "playerUses":true },
  "182":{  "attr":[1, 1, 1, 1, 2, 4, 4, 4], "id":182, "genusID":20, "name":"ペルセポネー", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[33, 68, 112, 0, 0, 0], "lvDefault":58, "strDefault":35, "intDefault":39, "vitDefault":37, "agiDefault":40, "lucDefault":33, "playerUses":true },
  "183":{  "attr":[1, 1, 2, 4, 2, 1, 3, 4], "id":183, "genusID":20, "name":"ヘル", "devilCost":19, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[12, 56, 146, 0, 0, 0], "lvDefault":47, "strDefault":26, "intDefault":35, "vitDefault":27, "agiDefault":33, "lucDefault":30, "playerUses":true },
  "184":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":184, "genusID":20, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "185":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":185, "genusID":20, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "186":{  "attr":[1, 1, 3, 3, 6, 2, 1, 4], "id":186, "genusID":21, "name":"フェンリル", "devilCost":16, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[142, 156, 392, 0, 0, 0], "lvDefault":71, "strDefault":51, "intDefault":37, "vitDefault":43, "agiDefault":49, "lucDefault":43, "playerUses":true },
  "187":{  "attr":[1, 1, 3, 1, 1, 2, 1, 1], "id":187, "genusID":21, "name":"カブラカン", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[105, 134, 155, 0, 0, 0], "lvDefault":64, "strDefault":46, "intDefault":37, "vitDefault":42, "agiDefault":38, "lucDefault":39, "playerUses":true },
  "188":{  "attr":[3, 1, 1, 1, 1, 1, 2, 1], "id":188, "genusID":21, "name":"カトブレパス", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[72, 74, 0, 0, 0, 0], "lvDefault":52, "strDefault":35, "intDefault":38, "vitDefault":33, "agiDefault":27, "lucDefault":33, "playerUses":true },
  "189":{  "attr":[1, 1, 1, 1, 3, 2, 1, 3], "id":189, "genusID":21, "name":"マンティコア", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[21, 110, 188, 0, 0, 0], "lvDefault":45, "strDefault":31, "intDefault":29, "vitDefault":30, "agiDefault":25, "lucDefault":30, "playerUses":true },
  "190":{  "attr":[1, 1, 2, 3, 2, 1, 1, 1], "id":190, "genusID":21, "name":"ピアレイ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[102, 167, 0, 0, 0, 0], "lvDefault":40, "strDefault":24, "intDefault":27, "vitDefault":29, "agiDefault":23, "lucDefault":27, "playerUses":true },
  "191":{  "attr":[1, 2, 1, 1, 3, 2, 1, 1], "id":191, "genusID":21, "name":"ヌエ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[25, 135, 0, 0, 0, 0], "lvDefault":27, "strDefault":21, "intDefault":18, "vitDefault":18, "agiDefault":18, "lucDefault":16, "playerUses":true },
  "192":{  "attr":[1, 1, 1, 1, 6, 2, 1, 4], "id":192, "genusID":21, "name":"ライジュウ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[20, 22, 385, 0, 0, 0], "lvDefault":17, "strDefault":11, "intDefault":13, "vitDefault":13, "agiDefault":14, "lucDefault":10, "playerUses":true },
  "193":{  "attr":[3, 3, 1, 1, 2, 2, 1, 1], "id":193, "genusID":21, "name":"カクエン", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[166, 175, 0, 0, 0, 0], "lvDefault":10, "strDefault":7, "intDefault":7, "vitDefault":11, "agiDefault":7, "lucDefault":8, "playerUses":true },
  "194":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":194, "genusID":21, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "195":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":195, "genusID":21, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "196":{  "attr":[3, 1, 1, 2, 1, 1, 1, 1], "id":196, "genusID":22, "name":"ヘカトンケイル", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[123, 162, 175, 0, 0, 0], "lvDefault":70, "strDefault":52, "intDefault":37, "vitDefault":50, "agiDefault":37, "lucDefault":44, "playerUses":true },
  "197":{  "attr":[5, 6, 2, 2, 2, 2, 2, 4], "id":197, "genusID":22, "name":"ギリメカラ", "devilCost":13, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[66, 156, 0, 0, 0, 0], "lvDefault":57, "strDefault":40, "intDefault":39, "vitDefault":31, "agiDefault":34, "lucDefault":37, "playerUses":true },
  "198":{  "attr":[3, 3, 1, 1, 1, 1, 2, 1], "id":198, "genusID":22, "name":"グレンデル", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[154, 173, 355, 0, 0, 0], "lvDefault":46, "strDefault":36, "intDefault":29, "vitDefault":31, "agiDefault":24, "lucDefault":28, "playerUses":true },
  "199":{  "attr":[3, 1, 5, 6, 1, 1, 1, 4], "id":199, "genusID":22, "name":"じゃあくフロスト", "devilCost":22, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[12, 56, 389, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":23, "vitDefault":20, "agiDefault":23, "lucDefault":17, "playerUses":true },
  "200":{  "attr":[1, 3, 1, 2, 1, 1, 3, 3], "id":200, "genusID":22, "name":"ラクシャーサ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[2, 157, 160, 0, 0, 0], "lvDefault":35, "strDefault":28, "intDefault":23, "vitDefault":23, "agiDefault":20, "lucDefault":21, "playerUses":true },
  "201":{  "attr":[1, 1, 2, 4, 2, 3, 1, 1], "id":201, "genusID":22, "name":"ウェンディゴ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 73, 171, 0, 0, 0], "lvDefault":23, "strDefault":21, "intDefault":16, "vitDefault":16, "agiDefault":12, "lucDefault":14, "playerUses":true },
  "202":{  "attr":[1, 1, 1, 3, 3, 2, 2, 1], "id":202, "genusID":22, "name":"イッポンダタラ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[142, 152, 0, 0, 0, 0], "lvDefault":10, "strDefault":11, "intDefault":7, "vitDefault":9, "agiDefault":6, "lucDefault":7, "playerUses":true },
  "203":{  "attr":[1, 1, 2, 1, 3, 2, 1, 1], "id":203, "genusID":22, "name":"グレムリン", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[13, 122, 0, 0, 0, 0], "lvDefault":5, "strDefault":6, "intDefault":4, "vitDefault":3, "agiDefault":8, "lucDefault":4, "playerUses":true },
  "204":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":204, "genusID":22, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "205":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":205, "genusID":22, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "206":{  "attr":[1, 4, 2, 1, 1, 1, 1, 1], "id":206, "genusID":23, "name":"アルケニー", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[68, 185, 0, 0, 0, 0], "lvDefault":39, "strDefault":29, "intDefault":21, "vitDefault":25, "agiDefault":30, "lucDefault":22, "playerUses":true },
  "207":{  "attr":[1, 2, 1, 1, 3, 2, 1, 4], "id":207, "genusID":23, "name":"モスマン", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[54, 71, 122, 0, 0, 0], "lvDefault":29, "strDefault":19, "intDefault":22, "vitDefault":16, "agiDefault":23, "lucDefault":17, "playerUses":true },
  "208":{  "attr":[1, 1, 1, 2, 1, 1, 1, 1], "id":208, "genusID":23, "name":"ミルメコレオ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[115, 191, 0, 0, 0, 0], "lvDefault":22, "strDefault":19, "intDefault":12, "vitDefault":15, "agiDefault":14, "lucDefault":16, "playerUses":true },
  "209":{  "attr":[1, 1, 1, 1, 2, 1, 1, 1], "id":209, "genusID":23, "name":"オキクムシ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[53, 180, 0, 0, 0, 0], "lvDefault":3, "strDefault":4, "intDefault":6, "vitDefault":2, "agiDefault":3, "lucDefault":4, "playerUses":true },
  "210":{  "attr":[1, 1, 1, 1, 2, 1, 2, 1], "id":210, "genusID":23, "name":"ウブ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[53, 101, 180, 0, 0, 0], "lvDefault":11, "strDefault":6, "intDefault":11, "vitDefault":10, "agiDefault":9, "lucDefault":7, "playerUses":true },
  "211":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":211, "genusID":23, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "212":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":212, "genusID":23, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "213":{  "attr":[6, 1, 6, 1, 6, 1, 4, 4], "id":213, "genusID":24, "name":"シヴァ", "devilCost":23, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[41, 390, 395, 0, 0, 0], "lvDefault":91, "strDefault":65, "intDefault":60, "vitDefault":58, "agiDefault":56, "lucDefault":54, "playerUses":true },
  "214":{  "attr":[3, 1, 1, 1, 1, 5, 4, 4], "id":214, "genusID":24, "name":"スサノオ", "devilCost":22, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[35, 45, 162, 0, 0, 0], "lvDefault":85, "strDefault":60, "intDefault":50, "vitDefault":53, "agiDefault":53, "lucDefault":54, "playerUses":true },
  "215":{  "attr":[4, 1, 1, 1, 1, 1, 4, 3], "id":215, "genusID":24, "name":"カルティケーヤ", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[124, 142, 186, 0, 0, 0], "lvDefault":70, "strDefault":45, "intDefault":41, "vitDefault":41, "agiDefault":55, "lucDefault":43, "playerUses":true },
  "216":{  "attr":[4, 4, 3, 2, 2, 1, 4, 1], "id":216, "genusID":24, "name":"セイテンタイセイ", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[136, 153, 352, 0, 0, 0], "lvDefault":58, "strDefault":42, "intDefault":37, "vitDefault":35, "agiDefault":40, "lucDefault":35, "playerUses":true },
  "217":{  "attr":[1, 1, 5, 2, 1, 1, 3, 3], "id":217, "genusID":24, "name":"トナティウ", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[6, 162, 361, 0, 0, 0], "lvDefault":45, "strDefault":35, "intDefault":26, "vitDefault":30, "agiDefault":28, "lucDefault":31, "playerUses":true },
  "218":{  "attr":[3, 3, 1, 1, 1, 1, 4, 1], "id":218, "genusID":24, "name":"アレス", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[158, 351, 391, 0, 0, 0], "lvDefault":36, "strDefault":29, "intDefault":22, "vitDefault":29, "agiDefault":21, "lucDefault":22, "playerUses":true },
  "219":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":219, "genusID":24, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "220":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":220, "genusID":24, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "221":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":221, "genusID":25, "name":"セイオウボ", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[140, 147, 192, 0, 0, 0], "lvDefault":79, "strDefault":50, "intDefault":54, "vitDefault":51, "agiDefault":46, "lucDefault":51, "playerUses":true },
  "222":{  "attr":[1, 1, 2, 6, 1, 1, 1, 1], "id":222, "genusID":25, "name":"スカディ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[15, 152, 383, 0, 0, 0], "lvDefault":73, "strDefault":52, "intDefault":41, "vitDefault":46, "agiDefault":51, "lucDefault":44, "playerUses":true },
  "223":{  "attr":[1, 1, 1, 1, 4, 2, 4, 3], "id":223, "genusID":25, "name":"ブラックマリア", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[21, 64, 106, 0, 0, 0], "lvDefault":64, "strDefault":39, "intDefault":47, "vitDefault":40, "agiDefault":41, "lucDefault":40, "playerUses":true },
  "224":{  "attr":[1, 4, 1, 1, 1, 1, 3, 3], "id":224, "genusID":25, "name":"ダイアナ", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[69, 118, 185, 0, 0, 0], "lvDefault":54, "strDefault":33, "intDefault":34, "vitDefault":35, "agiDefault":40, "lucDefault":35, "playerUses":true },
  "225":{  "attr":[1, 1, 1, 1, 1, 1, 3, 3], "id":225, "genusID":25, "name":"ハリティー", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[50, 64, 102, 0, 0, 0], "lvDefault":44, "strDefault":33, "intDefault":28, "vitDefault":29, "agiDefault":27, "lucDefault":30, "playerUses":true },
  "226":{  "attr":[1, 1, 2, 3, 1, 1, 2, 4], "id":226, "genusID":25, "name":"セドナ", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[14, 53, 114, 0, 0, 0], "lvDefault":34, "strDefault":22, "intDefault":27, "vitDefault":21, "agiDefault":21, "lucDefault":26, "playerUses":true },
  "227":{  "attr":[1, 1, 3, 2, 1, 3, 1, 3], "id":227, "genusID":25, "name":"ズェラロンズ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[7, 55, 359, 0, 0, 0], "lvDefault":21, "strDefault":13, "intDefault":14, "vitDefault":18, "agiDefault":15, "lucDefault":18, "playerUses":true },
  "228":{  "attr":[1, 1, 4, 2, 2, 1, 1, 1], "id":228, "genusID":25, "name":"ペレ", "devilCost":14, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[4, 69, 115, 0, 0, 0], "lvDefault":10, "strDefault":7, "intDefault":13, "vitDefault":8, "agiDefault":7, "lucDefault":10, "playerUses":true },
  "229":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":229, "genusID":25, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "230":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":230, "genusID":25, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "231":{  "attr":[3, 3, 3, 3, 3, 3, 4, 4], "id":231, "genusID":26, "name":"コウリュウ", "devilCost":34, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[39, 61, 395, 0, 0, 0], "lvDefault":78, "strDefault":50, "intDefault":54, "vitDefault":50, "agiDefault":52, "lucDefault":48, "playerUses":true },
  "232":{  "attr":[5, 3, 3, 2, 3, 2, 4, 1], "id":232, "genusID":26, "name":"ケツアルカトル", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[8, 107, 123, 0, 0, 0], "lvDefault":69, "strDefault":49, "intDefault":42, "vitDefault":45, "agiDefault":45, "lucDefault":41, "playerUses":true },
  "233":{  "attr":[1, 3, 1, 1, 1, 1, 1, 4], "id":233, "genusID":26, "name":"ショクイン", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[131, 379, 398, 0, 0, 0], "lvDefault":58, "strDefault":41, "intDefault":34, "vitDefault":39, "agiDefault":38, "lucDefault":37, "playerUses":true },
  "234":{  "attr":[1, 3, 3, 3, 2, 6, 4, 1], "id":234, "genusID":26, "name":"セイリュウ", "devilCost":16, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[30, 372, 0, 0, 0, 0], "lvDefault":45, "strDefault":33, "intDefault":24, "vitDefault":32, "agiDefault":31, "lucDefault":30, "playerUses":true },
  "235":{  "attr":[1, 3, 6, 4, 2, 3, 1, 2], "id":235, "genusID":26, "name":"グクマッツ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[37, 126, 0, 0, 0, 0], "lvDefault":35, "strDefault":21, "intDefault":27, "vitDefault":23, "agiDefault":26, "lucDefault":23, "playerUses":true },
  "236":{  "attr":[1, 3, 2, 1, 4, 3, 1, 1], "id":236, "genusID":26, "name":"パトリムパス", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[23, 34, 118, 0, 0, 0], "lvDefault":24, "strDefault":16, "intDefault":22, "vitDefault":17, "agiDefault":18, "lucDefault":14, "playerUses":true },
  "237":{  "attr":[1, 3, 4, 6, 1, 1, 2, 2], "id":237, "genusID":26, "name":"マカラ", "devilCost":15, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[16, 102, 363, 0, 0, 0], "lvDefault":13, "strDefault":8, "intDefault":12, "vitDefault":11, "agiDefault":15, "lucDefault":8, "playerUses":true },
  "238":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":238, "genusID":26, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "239":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":239, "genusID":26, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "240":{  "attr":[3, 1, 6, 1, 6, 1, 3, 3], "id":240, "genusID":27, "name":"トール", "devilCost":19, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[21, 153, 386, 0, 0, 0], "lvDefault":76, "strDefault":55, "intDefault":45, "vitDefault":53, "agiDefault":41, "lucDefault":49, "playerUses":true },
  "241":{  "attr":[3, 1, 1, 4, 1, 1, 3, 3], "id":241, "genusID":27, "name":"ビシャモンテン", "devilCost":21, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[17, 162, 384, 0, 0, 0], "lvDefault":65, "strDefault":44, "intDefault":43, "vitDefault":47, "agiDefault":39, "lucDefault":42, "playerUses":true },
  "242":{  "attr":[3, 1, 1, 1, 2, 5, 3, 3], "id":242, "genusID":27, "name":"ジコクテン", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[30, 159, 388, 0, 0, 0], "lvDefault":57, "strDefault":42, "intDefault":36, "vitDefault":35, "agiDefault":39, "lucDefault":39, "playerUses":true },
  "243":{  "attr":[3, 1, 1, 1, 5, 2, 3, 3], "id":243, "genusID":27, "name":"コウモクテン", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[20, 158, 368, 0, 0, 0], "lvDefault":47, "strDefault":37, "intDefault":32, "vitDefault":32, "agiDefault":31, "lucDefault":29, "playerUses":true },
  "244":{  "attr":[3, 1, 5, 2, 1, 1, 3, 3], "id":244, "genusID":27, "name":"ゾウチョウテン", "devilCost":20, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[2, 161, 360, 0, 0, 0], "lvDefault":37, "strDefault":32, "intDefault":23, "vitDefault":25, "agiDefault":27, "lucDefault":24, "playerUses":true },
  "245":{  "attr":[3, 1, 1, 3, 2, 3, 3, 3], "id":245, "genusID":27, "name":"タケミナカタ", "devilCost":17, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[29, 175, 402, 0, 0, 0], "lvDefault":27, "strDefault":23, "intDefault":20, "vitDefault":20, "agiDefault":15, "lucDefault":18, "playerUses":true },
  "246":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":246, "genusID":27, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "247":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":247, "genusID":27, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "248":{  "attr":[1, 1, 1, 1, 1, 1, 3, 4], "id":248, "genusID":28, "name":"ゴモリー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[64, 109, 401, 0, 0, 0], "lvDefault":60, "strDefault":36, "intDefault":41, "vitDefault":34, "agiDefault":39, "lucDefault":40, "playerUses":true },
  "249":{  "attr":[1, 2, 1, 1, 1, 1, 1, 4], "id":249, "genusID":28, "name":"デカラビア", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[37, 139, 0, 0, 0, 0], "lvDefault":50, "strDefault":29, "intDefault":36, "vitDefault":33, "agiDefault":29, "lucDefault":33, "playerUses":true },
  "250":{  "attr":[1, 1, 1, 1, 1, 1, 3, 4], "id":250, "genusID":28, "name":"オセ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[130, 159, 176, 0, 0, 0], "lvDefault":41, "strDefault":32, "intDefault":25, "vitDefault":22, "agiDefault":32, "lucDefault":22, "playerUses":true },
  "251":{  "attr":[2, 1, 3, 3, 2, 4, 3, 4], "id":251, "genusID":28, "name":"ダンタリアン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[32, 139, 143, 0, 0, 0], "lvDefault":33, "strDefault":17, "intDefault":27, "vitDefault":20, "agiDefault":22, "lucDefault":23, "playerUses":true },
  "252":{  "attr":[1, 1, 2, 1, 1, 1, 3, 3], "id":252, "genusID":28, "name":"オリアス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[32, 67, 128, 0, 0, 0], "lvDefault":27, "strDefault":16, "intDefault":18, "vitDefault":18, "agiDefault":21, "lucDefault":18, "playerUses":true },
  "253":{  "attr":[1, 2, 1, 1, 1, 1, 3, 3], "id":253, "genusID":28, "name":"ハルパス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[121, 123, 160, 0, 0, 0], "lvDefault":22, "strDefault":14, "intDefault":14, "vitDefault":13, "agiDefault":19, "lucDefault":16, "playerUses":true },
  "254":{  "attr":[1, 1, 1, 2, 1, 1, 2, 3], "id":254, "genusID":28, "name":"ビフロンス", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[4, 0, 0, 0, 0, 0], "lvDefault":16, "strDefault":10, "intDefault":14, "vitDefault":10, "agiDefault":13, "lucDefault":11, "playerUses":true },
  "255":{  "attr":[1, 1, 5, 1, 2, 1, 1, 1], "id":255, "genusID":28, "name":"メルコム", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[4, 0, 0, 0, 0, 0], "lvDefault":7, "strDefault":4, "intDefault":10, "vitDefault":6, "agiDefault":6, "lucDefault":5, "playerUses":true },
  "256":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":256, "genusID":28, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "257":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":257, "genusID":28, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "258":{  "attr":[3, 5, 1, 3, 3, 3, 2, 4], "id":258, "genusID":29, "name":"オンギュウキ", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[146, 159, 357, 0, 0, 0], "lvDefault":66, "strDefault":47, "intDefault":41, "vitDefault":39, "agiDefault":47, "lucDefault":39, "playerUses":true },
  "259":{  "attr":[3, 1, 2, 3, 1, 1, 1, 1], "id":259, "genusID":29, "name":"ベルセルク", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[121, 171, 174, 0, 0, 0], "lvDefault":53, "strDefault":39, "intDefault":32, "vitDefault":27, "agiDefault":37, "lucDefault":34, "playerUses":true },
  "260":{  "attr":[1, 1, 1, 1, 2, 5, 1, 4], "id":260, "genusID":29, "name":"フウキ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[30, 133, 161, 0, 0, 0], "lvDefault":36, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":28, "lucDefault":24, "playerUses":true },
  "261":{  "attr":[1, 1, 2, 4, 1, 1, 1, 4], "id":261, "genusID":29, "name":"スイキ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 158, 391, 0, 0, 0], "lvDefault":41, "strDefault":30, "intDefault":30, "vitDefault":24, "agiDefault":25, "lucDefault":24, "playerUses":true },
  "262":{  "attr":[3, 1, 1, 1, 4, 2, 1, 4], "id":262, "genusID":29, "name":"キンキ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[20, 169, 391, 0, 0, 0], "lvDefault":32, "strDefault":22, "intDefault":18, "vitDefault":27, "agiDefault":19, "lucDefault":20, "playerUses":true },
  "263":{  "attr":[3, 3, 1, 1, 1, 1, 1, 1], "id":263, "genusID":29, "name":"モムノフ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[142, 158, 0, 0, 0, 0], "lvDefault":19, "strDefault":15, "intDefault":10, "vitDefault":18, "agiDefault":11, "lucDefault":13, "playerUses":true },
  "264":{  "attr":[1, 1, 1, 1, 1, 1, 2, 2], "id":264, "genusID":29, "name":"ヤマワロ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[28, 73, 154, 0, 0, 0], "lvDefault":24, "strDefault":21, "intDefault":13, "vitDefault":17, "agiDefault":16, "lucDefault":15, "playerUses":true },
  "265":{  "attr":[3, 1, 2, 1, 2, 1, 1, 1], "id":265, "genusID":29, "name":"アズミ", "devilCost":11, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[154, 0, 0, 0, 0, 0], "lvDefault":12, "strDefault":10, "intDefault":8, "vitDefault":8, "agiDefault":12, "lucDefault":8, "playerUses":true },
  "266":{  "attr":[3, 1, 1, 1, 2, 1, 1, 1], "id":266, "genusID":29, "name":"オニ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[154, 169, 0, 0, 0, 0], "lvDefault":8, "strDefault":10, "intDefault":6, "vitDefault":7, "agiDefault":4, "lucDefault":7, "playerUses":true },
  "267":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":267, "genusID":29, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "268":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":268, "genusID":29, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "269":{  "attr":[5, 5, 1, 1, 2, 1, 1, 1], "id":269, "genusID":30, "name":"ランダ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[33, 129, 178, 0, 0, 0], "lvDefault":68, "strDefault":42, "intDefault":49, "vitDefault":39, "agiDefault":40, "lucDefault":44, "playerUses":true },
  "270":{  "attr":[1, 1, 3, 2, 1, 1, 3, 3], "id":270, "genusID":30, "name":"ダーキニー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[3, 55, 70, 0, 0, 0], "lvDefault":63, "strDefault":44, "intDefault":39, "vitDefault":39, "agiDefault":38, "lucDefault":39, "playerUses":true },
  "271":{  "attr":[1, 1, 3, 3, 2, 3, 4, 4], "id":271, "genusID":30, "name":"アトロポス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[52, 54, 59, 0, 0, 0], "lvDefault":49, "strDefault":27, "intDefault":36, "vitDefault":31, "agiDefault":31, "lucDefault":32, "playerUses":true },
  "272":{  "attr":[1, 1, 2, 3, 3, 3, 1, 1], "id":272, "genusID":30, "name":"ラケシス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[75, 121, 123, 0, 0, 0], "lvDefault":43, "strDefault":24, "intDefault":32, "vitDefault":28, "agiDefault":27, "lucDefault":28, "playerUses":true },
  "273":{  "attr":[1, 1, 3, 3, 3, 2, 1, 1], "id":273, "genusID":30, "name":"クロト", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[103, 118, 187, 0, 0, 0], "lvDefault":37, "strDefault":21, "intDefault":28, "vitDefault":23, "agiDefault":25, "lucDefault":24, "playerUses":true },
  "274":{  "attr":[1, 1, 2, 6, 1, 1, 1, 1], "id":274, "genusID":30, "name":"ユキジョロウ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[14, 52, 63, 0, 0, 0], "lvDefault":26, "strDefault":15, "intDefault":21, "vitDefault":17, "agiDefault":18, "lucDefault":17, "playerUses":true },
  "275":{  "attr":[1, 1, 1, 1, 3, 1, 1, 1], "id":275, "genusID":30, "name":"リャナンシー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[69, 104, 108, 0, 0, 0], "lvDefault":14, "strDefault":7, "intDefault":14, "vitDefault":9, "agiDefault":9, "lucDefault":13, "playerUses":true },
  "276":{  "attr":[1, 1, 2, 1, 1, 1, 1, 3], "id":276, "genusID":30, "name":"アチェリ", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[48, 110, 179, 0, 0, 0], "lvDefault":8, "strDefault":6, "intDefault":7, "vitDefault":5, "agiDefault":9, "lucDefault":7, "playerUses":true },
  "277":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":277, "genusID":30, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "278":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":278, "genusID":30, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "279":{  "attr":[1, 2, 3, 3, 6, 3, 1, 3], "id":279, "genusID":31, "name":"リリス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[27, 49, 69, 0, 0, 0], "lvDefault":66, "strDefault":38, "intDefault":46, "vitDefault":39, "agiDefault":42, "lucDefault":43, "playerUses":true },
  "280":{  "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":280, "genusID":31, "name":"ワイルド・ハント", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[55, 175, 393, 0, 0, 0], "lvDefault":55, "strDefault":35, "intDefault":30, "vitDefault":32, "agiDefault":43, "lucDefault":35, "playerUses":true },
  "281":{  "attr":[1, 1, 3, 3, 2, 1, 2, 4], "id":281, "genusID":31, "name":"サキュバス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[50, 63, 69, 0, 0, 0], "lvDefault":47, "strDefault":24, "intDefault":34, "vitDefault":26, "agiDefault":35, "lucDefault":32, "playerUses":true },
  "282":{  "attr":[1, 1, 1, 2, 1, 1, 4, 4], "id":282, "genusID":31, "name":"キウン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[2, 141, 378, 0, 0, 0], "lvDefault":34, "strDefault":20, "intDefault":29, "vitDefault":19, "agiDefault":22, "lucDefault":22, "playerUses":true },
  "283":{  "attr":[1, 1, 1, 1, 2, 3, 4, 1], "id":283, "genusID":31, "name":"インキュバス", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[29, 181, 0, 0, 0, 0], "lvDefault":23, "strDefault":13, "intDefault":20, "vitDefault":12, "agiDefault":17, "lucDefault":17, "playerUses":true },
  "284":{  "attr":[1, 1, 1, 1, 1, 2, 1, 1], "id":284, "genusID":31, "name":"フォーモリア", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[19, 171, 0, 0, 0, 0], "lvDefault":16, "strDefault":15, "intDefault":9, "vitDefault":13, "agiDefault":9, "lucDefault":12, "playerUses":true },
  "285":{  "attr":[1, 1, 1, 2, 3, 1, 1, 1], "id":285, "genusID":31, "name":"リリム", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[19, 22, 190, 0, 0, 0], "lvDefault":9, "strDefault":7, "intDefault":12, "vitDefault":5, "agiDefault":7, "lucDefault":6, "playerUses":true },
  "286":{  "attr":[1, 1, 1, 1, 4, 2, 1, 1], "id":286, "genusID":31, "name":"ザントマン", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[19, 63, 0, 0, 0, 0], "lvDefault":4, "strDefault":3, "intDefault":6, "vitDefault":5, "agiDefault":6, "lucDefault":2, "playerUses":true },
  "287":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":287, "genusID":31, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "288":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":288, "genusID":31, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "289":{  "attr":[3, 1, 2, 3, 3, 3, 4, 4], "id":289, "genusID":32, "name":"マーラ", "devilCost":24, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[139, 142, 162, 0, 0, 0], "lvDefault":88, "strDefault":59, "intDefault":61, "vitDefault":54, "agiDefault":52, "lucDefault":53, "playerUses":true },
  "290":{  "attr":[1, 1, 6, 2, 1, 1, 3, 4], "id":290, "genusID":32, "name":"スルト", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[3, 9, 382, 0, 0, 0], "lvDefault":77, "strDefault":53, "intDefault":49, "vitDefault":51, "agiDefault":45, "lucDefault":48, "playerUses":true },
  "291":{  "attr":[1, 1, 1, 1, 6, 1, 4, 4], "id":291, "genusID":32, "name":"ツィツィミトル", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[38, 50, 370, 0, 0, 0], "lvDefault":71, "strDefault":45, "intDefault":49, "vitDefault":43, "agiDefault":41, "lucDefault":45, "playerUses":true },
  "292":{  "attr":[3, 1, 1, 1, 2, 3, 1, 4], "id":292, "genusID":32, "name":"アバドン", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[162, 392, 0, 0, 0, 0], "lvDefault":60, "strDefault":42, "intDefault":33, "vitDefault":41, "agiDefault":38, "lucDefault":36, "playerUses":true },
  "293":{  "attr":[1, 1, 2, 6, 1, 1, 4, 1], "id":293, "genusID":32, "name":"キングフロスト", "devilCost":41, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[18, 106, 152, 0, 0, 0], "lvDefault":40, "strDefault":26, "intDefault":32, "vitDefault":29, "agiDefault":25, "lucDefault":28, "playerUses":true },
  "294":{  "attr":[1, 4, 1, 3, 1, 3, 1, 3], "id":294, "genusID":32, "name":"ロキ", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[15, 76, 136, 0, 0, 0], "lvDefault":52, "strDefault":33, "intDefault":38, "vitDefault":30, "agiDefault":32, "lucDefault":33, "playerUses":true },
  "295":{  "attr":[1, 1, 4, 1, 1, 1, 2, 4], "id":295, "genusID":32, "name":"バロール", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[5, 47, 155, 0, 0, 0], "lvDefault":44, "strDefault":32, "intDefault":30, "vitDefault":27, "agiDefault":27, "lucDefault":26, "playerUses":true },
  "296":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":296, "genusID":32, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "297":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":297, "genusID":32, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "298":{  "attr":[3, 3, 1, 2, 2, 1, 1, 1], "id":298, "genusID":33, "name":"ファフニール", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[140, 156, 0, 0, 0, 0], "lvDefault":72, "strDefault":51, "intDefault":40, "vitDefault":47, "agiDefault":43, "lucDefault":45, "playerUses":true },
  "299":{  "attr":[1, 3, 1, 5, 3, 2, 2, 1], "id":299, "genusID":33, "name":"ニーズホッグ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[48, 168, 182, 0, 0, 0], "lvDefault":65, "strDefault":46, "intDefault":40, "vitDefault":46, "agiDefault":35, "lucDefault":38, "playerUses":true },
  "300":{  "attr":[1, 1, 1, 1, 5, 2, 1, 1], "id":300, "genusID":33, "name":"ムシュフシュ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[21, 71, 110, 0, 0, 0], "lvDefault":61, "strDefault":40, "intDefault":38, "vitDefault":35, "agiDefault":39, "lucDefault":41, "playerUses":true },
  "301":{  "attr":[1, 1, 1, 2, 1, 1, 1, 3], "id":301, "genusID":33, "name":"キングー", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[3, 127, 161, 0, 0, 0], "lvDefault":46, "strDefault":30, "intDefault":35, "vitDefault":25, "agiDefault":29, "lucDefault":29, "playerUses":true },
  "302":{  "attr":[1, 1, 1, 2, 1, 2, 1, 4], "id":302, "genusID":33, "name":"バジリスク", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[71, 178, 0, 0, 0, 0], "lvDefault":35, "strDefault":25, "intDefault":28, "vitDefault":18, "agiDefault":22, "lucDefault":22, "playerUses":true },
  "303":{  "attr":[1, 1, 2, 3, 1, 1, 1, 1], "id":303, "genusID":33, "name":"ハクジョウシ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 104, 187, 0, 0, 0], "lvDefault":27, "strDefault":20, "intDefault":18, "vitDefault":15, "agiDefault":18, "lucDefault":20, "playerUses":true },
  "304":{  "attr":[1, 1, 1, 1, 1, 1, 2, 2], "id":304, "genusID":33, "name":"チョトンダ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[10, 154, 0, 0, 0, 0], "lvDefault":15, "strDefault":15, "intDefault":10, "vitDefault":11, "agiDefault":10, "lucDefault":9, "playerUses":true },
  "305":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":305, "genusID":33, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "306":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":306, "genusID":33, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "307":{  "attr":[2, 3, 2, 3, 3, 3, 2, 4], "id":307, "genusID":34, "name":"レギオン", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[25, 47, 0, 0, 0, 0], "lvDefault":36, "strDefault":30, "intDefault":19, "vitDefault":27, "agiDefault":20, "lucDefault":22, "playerUses":true },
  "308":{  "attr":[1, 1, 2, 1, 1, 1, 1, 4], "id":308, "genusID":34, "name":"ピシャーチャ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[34, 48, 0, 0, 0, 0], "lvDefault":29, "strDefault":25, "intDefault":15, "vitDefault":19, "agiDefault":20, "lucDefault":18, "playerUses":true },
  "309":{  "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":309, "genusID":34, "name":"マカーブル", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[54, 176, 0, 0, 0, 0], "lvDefault":18, "strDefault":17, "intDefault":9, "vitDefault":13, "agiDefault":12, "lucDefault":13, "playerUses":true },
  "310":{  "attr":[1, 1, 4, 2, 1, 1, 1, 3], "id":310, "genusID":34, "name":"インフェルノ", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[2, 375, 0, 0, 0, 0], "lvDefault":23, "strDefault":17, "intDefault":13, "vitDefault":22, "agiDefault":13, "lucDefault":14, "playerUses":true },
  "311":{  "attr":[1, 1, 2, 1, 1, 1, 2, 1], "id":311, "genusID":34, "name":"ディブク", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[63, 123, 0, 0, 0, 0], "lvDefault":2, "strDefault":3, "intDefault":3, "vitDefault":2, "agiDefault":3, "lucDefault":5, "playerUses":true },
  "312":{  "attr":[1, 1, 2, 2, 2, 1, 1, 1], "id":312, "genusID":34, "name":"ポルターガイスト", "devilCost":13, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[127, 163, 0, 0, 0, 0], "lvDefault":7, "strDefault":7, "intDefault":4, "vitDefault":9, "agiDefault":7, "lucDefault":4, "playerUses":true },
  "313":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":313, "genusID":34, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "314":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":314, "genusID":34, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "315":{  "attr":[5, 5, 1, 1, 1, 1, 2, 2], "id":315, "genusID":35, "name":"ドッペルゲンガー", "devilCost":16, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[140, 0, 0, 0, 0, 0], "lvDefault":25, "strDefault":17, "intDefault":17, "vitDefault":17, "agiDefault":17, "lucDefault":17, "playerUses":true },
  "316":{  "attr":[1, 1, 2, 2, 2, 2, 2, 1], "id":316, "genusID":35, "name":"スライム", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[151, 0, 0, 0, 0, 0], "lvDefault":1, "strDefault":2, "intDefault":5, "vitDefault":5, "agiDefault":3, "lucDefault":3, "playerUses":true },
  "317":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":317, "genusID":35, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "318":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":318, "genusID":35, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "319":{  "attr":[1, 1, 2, 1, 1, 1, 2, 4], "id":319, "genusID":36, "name":"ヴェータラ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[67, 126, 128, 0, 0, 0], "lvDefault":67, "strDefault":47, "intDefault":39, "vitDefault":47, "agiDefault":37, "lucDefault":41, "playerUses":true },
  "320":{  "attr":[1, 1, 2, 1, 1, 1, 1, 4], "id":320, "genusID":36, "name":"クドラク", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[49, 54, 389, 0, 0, 0], "lvDefault":56, "strDefault":36, "intDefault":32, "vitDefault":37, "agiDefault":39, "lucDefault":34, "playerUses":true },
  "321":{  "attr":[1, 1, 2, 1, 3, 3, 2, 4], "id":321, "genusID":36, "name":"ストリゴイイ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[48, 65, 174, 0, 0, 0], "lvDefault":45, "strDefault":34, "intDefault":25, "vitDefault":30, "agiDefault":30, "lucDefault":26, "playerUses":true },
  "322":{  "attr":[1, 1, 2, 1, 1, 1, 2, 4], "id":322, "genusID":36, "name":"グール", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[53, 164, 0, 0, 0, 0], "lvDefault":30, "strDefault":26, "intDefault":16, "vitDefault":21, "agiDefault":19, "lucDefault":18, "playerUses":true },
  "323":{  "attr":[1, 1, 1, 1, 1, 1, 2, 4], "id":323, "genusID":36, "name":"チュレル", "devilCost":15, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[49, 69, 0, 0, 0, 0], "lvDefault":24, "strDefault":17, "intDefault":20, "vitDefault":15, "agiDefault":14, "lucDefault":16, "playerUses":true },
  "324":{  "attr":[1, 1, 3, 3, 2, 2, 2, 4], "id":324, "genusID":36, "name":"モウリョウ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[46, 130, 0, 0, 0, 0], "lvDefault":17, "strDefault":17, "intDefault":11, "vitDefault":13, "agiDefault":10, "lucDefault":10, "playerUses":true },
  "325":{  "attr":[1, 1, 2, 2, 1, 2, 2, 3], "id":325, "genusID":36, "name":"ガキ", "devilCost":13, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[126, 163, 0, 0, 0, 0], "lvDefault":6, "strDefault":8, "intDefault":5, "vitDefault":6, "agiDefault":7, "lucDefault":2, "playerUses":true },
  "326":{  "attr":[1, 1, 1, 1, 1, 1, 1, 1], "id":326, "genusID":18, "name":"ブギブー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[29, 105, 0, 0, 0, 0], "lvDefault":20, "strDefault":13, "intDefault":17, "vitDefault":14, "agiDefault":15, "lucDefault":16, "playerUses":true },
  "327":{  "attr":[1, 1, 1, 1, 1, 1, 1, 1], "id":327, "genusID":18, "name":"ボギブー", "devilCost":12, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[11, 20, 68, 0, 0, 0], "lvDefault":20, "strDefault":14, "intDefault":14, "vitDefault":14, "agiDefault":14, "lucDefault":14, "playerUses":true },
  "328":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":328, "genusID":44, "name":"サキミタマ", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[140, 396, 0, 0, 0, 0], "lvDefault":36, "strDefault":23, "intDefault":22, "vitDefault":26, "agiDefault":22, "lucDefault":25, "playerUses":true },
  "329":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":329, "genusID":44, "name":"クシミタマ", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[142, 143, 0, 0, 0, 0], "lvDefault":31, "strDefault":19, "intDefault":20, "vitDefault":22, "agiDefault":23, "lucDefault":19, "playerUses":true },
  "330":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":330, "genusID":44, "name":"ニギミタマ", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[104, 118, 0, 0, 0, 0], "lvDefault":26, "strDefault":15, "intDefault":20, "vitDefault":17, "agiDefault":17, "lucDefault":19, "playerUses":true },
  "331":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":331, "genusID":44, "name":"アラミタマ", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[142, 151, 0, 0, 0, 0], "lvDefault":21, "strDefault":17, "intDefault":13, "vitDefault":14, "agiDefault":16, "lucDefault":13, "playerUses":true },
  "332":{  "attr":[1, 1, 1, 1, 1, 1, 1, 1], "id":332, "genusID":18, "name":"バガブー", "devilCost":12, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[2, 54, 0, 0, 0, 0], "lvDefault":20, "strDefault":17, "intDefault":13, "vitDefault":16, "agiDefault":15, "lucDefault":14, "playerUses":true },
  "333":{  "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":333, "genusID":55, "name":"デモニカもどき(L)", "devilCost":12, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[228, 241, 398, 0, 0, 0], "lvDefault":1, "strDefault":3, "intDefault":5, "vitDefault":4, "agiDefault":4, "lucDefault":4, "playerUses":true },
  "334":{  "attr":[1, 1, 4, 1, 1, 1, 4, 4], "id":334, "genusID":38, "name":"サラマンダー", "devilCost":48, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[5, 0, 0, 0, 0, 0], "lvDefault":32, "strDefault":23, "intDefault":20, "vitDefault":20, "agiDefault":22, "lucDefault":21, "playerUses":true },
  "335":{  "attr":[1, 1, 1, 4, 1, 1, 4, 4], "id":335, "genusID":38, "name":"ウンディーネ", "devilCost":48, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[13, 0, 0, 0, 0, 0], "lvDefault":28, "strDefault":18, "intDefault":21, "vitDefault":17, "agiDefault":19, "lucDefault":19, "playerUses":true },
  "336":{  "attr":[1, 1, 1, 1, 1, 4, 4, 4], "id":336, "genusID":38, "name":"シルフ", "devilCost":48, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[29, 0, 0, 0, 0, 0], "lvDefault":25, "strDefault":17, "intDefault":16, "vitDefault":14, "agiDefault":20, "lucDefault":18, "playerUses":true },
  "337":{  "attr":[1, 3, 1, 1, 1, 1, 4, 4], "id":337, "genusID":38, "name":"ノーム", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[110, 113, 0, 0, 0, 0], "lvDefault":21, "strDefault":14, "intDefault":13, "vitDefault":17, "agiDefault":15, "lucDefault":14, "playerUses":true },
  "338":{  "attr":[1, 1, 3, 2, 1, 1, 4, 4], "id":338, "genusID":38, "name":"フレイミーズ", "devilCost":45, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[4, 111, 0, 0, 0, 0], "lvDefault":20, "strDefault":15, "intDefault":14, "vitDefault":14, "agiDefault":13, "lucDefault":14, "playerUses":true },
  "339":{  "attr":[1, 1, 2, 3, 1, 1, 4, 4], "id":339, "genusID":38, "name":"アクアンズ", "devilCost":45, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[10, 108, 0, 0, 0, 0], "lvDefault":16, "strDefault":12, "intDefault":11, "vitDefault":12, "agiDefault":11, "lucDefault":12, "playerUses":true },
  "340":{  "attr":[1, 1, 1, 1, 2, 3, 4, 4], "id":340, "genusID":38, "name":"エアロス", "devilCost":45, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[28, 0, 0, 0, 0, 0], "lvDefault":12, "strDefault":7, "intDefault":10, "vitDefault":9, "agiDefault":11, "lucDefault":9, "playerUses":true },
  "341":{  "attr":[1, 3, 1, 1, 1, 1, 4, 4], "id":341, "genusID":38, "name":"アーシーズ", "devilCost":47, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[19, 0, 0, 0, 0, 0], "lvDefault":8, "strDefault":7, "intDefault":9, "vitDefault":6, "agiDefault":5, "lucDefault":7, "playerUses":true },
  "342":{  "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":342, "genusID":55, "name":"デモニカもどき(N)", "devilCost":12, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[231, 242, 398, 0, 0, 0], "lvDefault":1, "strDefault":4, "intDefault":4, "vitDefault":4, "agiDefault":4, "lucDefault":4, "playerUses":true },
  "343":{  "attr":[1, 1, 1, 1, 1, 1, 4, 2], "id":343, "genusID":55, "name":"デモニカもどき(C)", "devilCost":12, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[240, 243, 398, 0, 0, 0], "lvDefault":1, "strDefault":5, "intDefault":3, "vitDefault":4, "agiDefault":4, "lucDefault":4, "playerUses":true },
  "344":{  "attr":[4, 1, 1, 1, 6, 2, 4, 4], "id":344, "genusID":39, "name":"マザーハーロット", "devilCost":50, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[24, 42, 56, 0, 0, 0], "lvDefault":90, "strDefault":60, "intDefault":62, "vitDefault":58, "agiDefault":53, "lucDefault":57, "playerUses":true },
  "345":{  "attr":[1, 1, 3, 3, 3, 3, 4, 4], "id":345, "genusID":39, "name":"トランペッター", "devilCost":22, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[39, 51, 82, 0, 0, 0], "lvDefault":83, "strDefault":52, "intDefault":53, "vitDefault":52, "agiDefault":49, "lucDefault":58, "playerUses":true },
  "346":{  "attr":[1, 1, 1, 3, 2, 5, 4, 4], "id":346, "genusID":39, "name":"ペイルライダー", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[35, 56, 176, 0, 0, 0], "lvDefault":78, "strDefault":51, "intDefault":45, "vitDefault":49, "agiDefault":54, "lucDefault":50, "playerUses":true },
  "347":{  "attr":[1, 1, 2, 6, 1, 1, 4, 4], "id":347, "genusID":39, "name":"ブラックライダー", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[17, 38, 129, 0, 0, 0], "lvDefault":69, "strDefault":43, "intDefault":48, "vitDefault":40, "agiDefault":48, "lucDefault":43, "playerUses":true },
  "348":{  "attr":[1, 1, 4, 2, 1, 1, 4, 4], "id":348, "genusID":39, "name":"レッドライダー", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[6, 158, 392, 0, 0, 0], "lvDefault":59, "strDefault":36, "intDefault":39, "vitDefault":37, "agiDefault":44, "lucDefault":36, "playerUses":true },
  "349":{  "attr":[1, 1, 1, 1, 4, 2, 4, 4], "id":349, "genusID":39, "name":"ホワイトライダー", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[24, 185, 393, 0, 0, 0], "lvDefault":49, "strDefault":35, "intDefault":29, "vitDefault":31, "agiDefault":36, "lucDefault":31, "playerUses":true },
  "350":{  "attr":[3, 5, 1, 1, 1, 1, 3, 4], "id":350, "genusID":39, "name":"アリス", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[50, 57, 187, 0, 0, 0], "lvDefault":39, "strDefault":25, "intDefault":37, "vitDefault":23, "agiDefault":25, "lucDefault":22, "playerUses":true },
  "351":{  "attr":[3, 3, 1, 1, 2, 1, 3, 4], "id":351, "genusID":39, "name":"マタドール", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[136, 161, 397, 0, 0, 0], "lvDefault":30, "strDefault":21, "intDefault":21, "vitDefault":17, "agiDefault":27, "lucDefault":19, "playerUses":true },
  "352":{  "attr":[1, 1, 3, 3, 2, 1, 3, 4], "id":352, "genusID":39, "name":"デイビット", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[55, 74, 176, 0, 0, 0], "lvDefault":22, "strDefault":16, "intDefault":16, "vitDefault":14, "agiDefault":16, "lucDefault":19, "playerUses":true },
  "353":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":353, "genusID":39, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "354":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":354, "genusID":39, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "355":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":355, "genusID":40, "name":"カンギテン", "devilCost":27, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[119, 147, 192, 0, 0, 0], "lvDefault":80, "strDefault":51, "intDefault":48, "vitDefault":53, "agiDefault":51, "lucDefault":57, "playerUses":true },
  "356":{  "attr":[3, 4, 2, 1, 1, 1, 4, 1], "id":356, "genusID":40, "name":"カーマ", "devilCost":26, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[141, 186, 190, 0, 0, 0], "lvDefault":72, "strDefault":47, "intDefault":49, "vitDefault":42, "agiDefault":47, "lucDefault":51, "playerUses":true },
  "357":{  "attr":[1, 1, 4, 1, 1, 1, 4, 4], "id":357, "genusID":40, "name":"キンマモン", "devilCost":28, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[37, 105, 379, 0, 0, 0], "lvDefault":58, "strDefault":33, "intDefault":42, "vitDefault":37, "agiDefault":40, "lucDefault":42, "playerUses":true },
  "358":{  "attr":[1, 1, 1, 1, 1, 1, 4, 4], "id":358, "genusID":40, "name":"アメノフトタマ", "devilCost":27, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[103, 126, 137, 0, 0, 0], "lvDefault":42, "strDefault":27, "intDefault":33, "vitDefault":30, "agiDefault":26, "lucDefault":30, "playerUses":true },
  "359":{  "attr":[2, 3, 1, 1, 1, 1, 4, 1], "id":359, "genusID":40, "name":"カンバリ", "devilCost":26, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[60, 139, 184, 0, 0, 0], "lvDefault":27, "strDefault":21, "intDefault":17, "vitDefault":23, "agiDefault":20, "lucDefault":20, "playerUses":true },
  "360":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":360, "genusID":40, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "361":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":361, "genusID":40, "name":"[ダミー]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "362":{  "attr":[1, 2, 2, 2, 2, 2, 3, 3], "id":362, "genusID":41, "name":"イナバシロウサギ", "devilCost":14, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[105, 122, 399, 0, 0, 0], "lvDefault":37, "strDefault":24, "intDefault":23, "vitDefault":22, "agiDefault":33, "lucDefault":24, "playerUses":true },
  "363":{  "attr":[1, 1, 1, 1, 4, 2, 1, 1], "id":363, "genusID":41, "name":"クダ", "devilCost":17, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[23, 141, 402, 0, 0, 0], "lvDefault":28, "strDefault":17, "intDefault":28, "vitDefault":19, "agiDefault":16, "lucDefault":19, "playerUses":true },
  "364":{  "attr":[1, 1, 2, 1, 1, 1, 3, 3], "id":364, "genusID":41, "name":"チュパカブラ", "devilCost":17, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[48, 134, 166, 0, 0, 0], "lvDefault":19, "strDefault":17, "intDefault":9, "vitDefault":16, "agiDefault":15, "lucDefault":15, "playerUses":true },
  "365":{  "attr":[1, 1, 3, 3, 3, 3, 1, 1], "id":365, "genusID":41, "name":"マメダヌキ", "devilCost":18, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[174, 180, 400, 0, 0, 0], "lvDefault":13, "strDefault":8, "intDefault":8, "vitDefault":12, "agiDefault":11, "lucDefault":15, "playerUses":true },
  "366":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":366, "genusID":41, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "367":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":367, "genusID":41, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "368":{  "attr":[3, 1, 3, 3, 3, 3, 4, 4], "id":368, "genusID":42, "name":"マサカド", "devilCost":60, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[177, 192, 390, 0, 0, 0], "lvDefault":92, "strDefault":62, "intDefault":64, "vitDefault":55, "agiDefault":58, "lucDefault":57, "playerUses":true },
  "369":{  "attr":[1, 1, 3, 2, 3, 4, 1, 4], "id":369, "genusID":42, "name":"テスカトリポカ", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[33, 45, 165, 0, 0, 0], "lvDefault":81, "strDefault":53, "intDefault":53, "vitDefault":54, "agiDefault":52, "lucDefault":46, "playerUses":true },
  "370":{  "attr":[3, 1, 2, 1, 1, 1, 1, 1], "id":370, "genusID":42, "name":"アティス", "devilCost":19, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[17, 144, 0, 0, 0, 0], "lvDefault":73, "strDefault":53, "intDefault":44, "vitDefault":47, "agiDefault":44, "lucDefault":46, "playerUses":true },
  "371":{  "attr":[1, 1, 1, 1, 1, 1, 4, 1], "id":371, "genusID":42, "name":"アラミサキ", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[122, 144, 174, 0, 0, 0], "lvDefault":58, "strDefault":42, "intDefault":40, "vitDefault":37, "agiDefault":34, "lucDefault":36, "playerUses":true },
  "372":{  "attr":[3, 3, 1, 1, 3, 2, 1, 1], "id":372, "genusID":42, "name":"ディオニュソス", "devilCost":20, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[70, 74, 138, 0, 0, 0], "lvDefault":41, "strDefault":26, "intDefault":33, "vitDefault":27, "agiDefault":25, "lucDefault":27, "playerUses":true },
  "373":{  "attr":[1, 1, 4, 1, 1, 1, 1, 4], "id":373, "genusID":42, "name":"オグン", "devilCost":21, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[4, 185, 381, 0, 0, 0], "lvDefault":24, "strDefault":18, "intDefault":15, "vitDefault":15, "agiDefault":22, "lucDefault":17, "playerUses":true },
  "374":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":374, "genusID":42, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":61, "intDefault":63, "vitDefault":61, "agiDefault":61, "lucDefault":61, "playerUses":false },
  "375":{  "attr":[3, 4, 1, 1, 1, 1, 4, 4], "id":375, "genusID":48, "name":"アリラト", "devilCost":42, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[39, 103, 143, 0, 0, 0], "lvDefault":84, "strDefault":54, "intDefault":54, "vitDefault":63, "agiDefault":47, "lucDefault":54, "playerUses":true },
  "376":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":376, "genusID":24, "name":"[セイテンタイセイ]", "devilCost":95, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":54, "strDefault":37, "intDefault":35, "vitDefault":33, "agiDefault":38, "lucDefault":34, "playerUses":false },
  "377":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":377, "genusID":3, "name":"[ヤタガラス]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":57, "strDefault":37, "intDefault":37, "vitDefault":32, "agiDefault":42, "lucDefault":38, "playerUses":false },
  "378":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":378, "genusID":26, "name":"[ショクイン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":61, "strDefault":43, "intDefault":37, "vitDefault":39, "agiDefault":40, "lucDefault":39, "playerUses":false },
  "379":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":379, "genusID":5, "name":"[ケルプ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":62, "strDefault":37, "intDefault":44, "vitDefault":36, "agiDefault":39, "lucDefault":40, "playerUses":false },
  "380":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":380, "genusID":39, "name":"[マタドール]", "devilCost":90, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[136, 161, 397, 0, 0, 0], "lvDefault":30, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "381":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":381, "genusID":16, "name":"[ＵＮＫＮＯＷＮ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[1, 101, 0, 0, 0, 0], "lvDefault":99, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "382":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":382, "genusID":18, "name":"[ＵＮＫＮＯＷＮ]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[10, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "383":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":383, "genusID":34, "name":"[ＵＮＫＮＯＷＮ]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[127, 163, 0, 0, 0, 0], "lvDefault":99, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "384":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":384, "genusID":35, "name":"[ＵＮＫＮＯＷＮ]", "devilCost":84, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[151, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "385":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":385, "genusID":35, "name":"[ＵＮＫＮＯＷＮ]", "devilCost":84, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[151, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "386":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":386, "genusID":22, "name":"[ピシャーチャ]", "devilCost":90, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":45, "strDefault":29, "intDefault":29, "vitDefault":29, "agiDefault":29, "lucDefault":29, "playerUses":false },
  "387":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":387, "genusID":42, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[4, 185, 381, 0, 0, 0], "lvDefault":99, "strDefault":63, "intDefault":63, "vitDefault":63, "agiDefault":63, "lucDefault":63, "playerUses":false },
  "388":{  "attr":[1, 1, 5, 2, 1, 1, 1, 4], "id":388, "genusID":32, "name":"モラクス", "devilCost":27, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[73, 154, 391, 0, 0, 0], "lvDefault":15, "strDefault":13, "intDefault":15, "vitDefault":12, "agiDefault":11, "lucDefault":9, "playerUses":true },
  "389":{  "attr":[1, 1, 1, 4, 1, 2, 4, 1], "id":389, "genusID":32, "name":"ミトラス", "devilCost":27, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[53, 58, 157, 0, 0, 0], "lvDefault":25, "strDefault":17, "intDefault":21, "vitDefault":19, "agiDefault":17, "lucDefault":16, "playerUses":true },
  "390":{  "attr":[3, 3, 2, 1, 2, 1, 1, 3], "id":390, "genusID":32, "name":"オーカス", "devilCost":27, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[49, 152, 155, 0, 0, 0], "lvDefault":33, "strDefault":25, "intDefault":23, "vitDefault":26, "agiDefault":19, "lucDefault":21, "playerUses":true },
  "391":{  "attr":[1, 1, 5, 2, 1, 5, 3, 3], "id":391, "genusID":32, "name":"アスラ", "devilCost":28, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[5, 68, 161, 0, 0, 0], "lvDefault":42, "strDefault":28, "intDefault":29, "vitDefault":31, "agiDefault":27, "lucDefault":26, "playerUses":true },
  "392":{  "attr":[3, 3, 2, 1, 6, 1, 3, 3], "id":392, "genusID":19, "name":"ウロボロス", "devilCost":38, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[23, 135, 396, 0, 0, 0], "lvDefault":49, "strDefault":32, "intDefault":33, "vitDefault":36, "agiDefault":32, "lucDefault":29, "playerUses":true },
  "393":{  "attr":[1, 1, 5, 2, 3, 1, 1, 4], "id":393, "genusID":32, "name":"モロク", "devilCost":29, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[74, 156, 392, 0, 0, 0], "lvDefault":50, "strDefault":36, "intDefault":33, "vitDefault":30, "agiDefault":32, "lucDefault":34, "playerUses":true },
  "394":{  "attr":[1, 1, 3, 4, 1, 2, 1, 4], "id":394, "genusID":28, "name":"ミスラ", "devilCost":35, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[54, 59, 153, 0, 0, 0], "lvDefault":53, "strDefault":32, "intDefault":38, "vitDefault":35, "agiDefault":34, "lucDefault":35, "playerUses":true },
  "395":{  "attr":[3, 3, 2, 3, 2, 1, 1, 4], "id":395, "genusID":20, "name":"オルクス", "devilCost":39, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[50, 153, 162, 0, 0, 0], "lvDefault":55, "strDefault":38, "intDefault":33, "vitDefault":39, "agiDefault":34, "lucDefault":36, "playerUses":true },
  "396":{  "attr":[1, 1, 5, 2, 3, 5, 4, 1], "id":396, "genusID":25, "name":"アシェラト", "devilCost":30, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[6, 176, 182, 0, 0, 0], "lvDefault":58, "strDefault":40, "intDefault":41, "vitDefault":37, "agiDefault":36, "lucDefault":35, "playerUses":true },
  "397":{  "attr":[1, 1, 4, 6, 2, 1, 1, 3], "id":397, "genusID":33, "name":"ティアマト", "devilCost":36, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[15, 131, 169, 0, 0, 0], "lvDefault":63, "strDefault":41, "intDefault":41, "vitDefault":42, "agiDefault":40, "lucDefault":40, "playerUses":true },
  "398":{  "attr":[1, 2, 1, 1, 1, 1, 3, 3], "id":398, "genusID":31, "name":"マーヤー", "devilCost":31, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[38, 143, 0, 0, 0, 0], "lvDefault":70, "strDefault":44, "intDefault":50, "vitDefault":40, "agiDefault":45, "lucDefault":46, "playerUses":true },
  "399":{  "attr":[1, 5, 2, 5, 1, 5, 4, 1], "id":399, "genusID":1, "name":"マンセマット", "devilCost":34, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[35, 39, 107, 0, 0, 0], "lvDefault":82, "strDefault":50, "intDefault":57, "vitDefault":49, "agiDefault":51, "lucDefault":54, "playerUses":true },
  "400":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":400, "genusID":32, "name":"[モラクス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":10, "strDefault":13, "intDefault":14, "vitDefault":7, "agiDefault":9, "lucDefault":11, "playerUses":false },
  "401":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":401, "genusID":32, "name":"[ミトラス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":19, "strDefault":17, "intDefault":17, "vitDefault":13, "agiDefault":13, "lucDefault":18, "playerUses":false },
  "402":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":402, "genusID":32, "name":"[オーカス]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":28, "strDefault":26, "intDefault":24, "vitDefault":17, "agiDefault":18, "lucDefault":22, "playerUses":false },
  "403":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":403, "genusID":32, "name":"[アスラ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":37, "strDefault":29, "intDefault":29, "vitDefault":22, "agiDefault":24, "lucDefault":27, "playerUses":false },
  "404":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":404, "genusID":19, "name":"[ウロボロス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":43, "strDefault":27, "intDefault":30, "vitDefault":31, "agiDefault":27, "lucDefault":31, "playerUses":false },
  "405":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":405, "genusID":19, "name":"[ウロボロス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":46, "strDefault":37, "intDefault":35, "vitDefault":32, "agiDefault":27, "lucDefault":42, "playerUses":false },
  "406":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":406, "genusID":32, "name":"[モロク]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":46, "strDefault":35, "intDefault":35, "vitDefault":31, "agiDefault":31, "lucDefault":33, "playerUses":false },
  "407":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":407, "genusID":28, "name":"[ミスラ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":50, "strDefault":38, "intDefault":37, "vitDefault":34, "agiDefault":31, "lucDefault":35, "playerUses":false },
  "408":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":408, "genusID":20, "name":"[オルクス]", "devilCost":95, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":51, "strDefault":38, "intDefault":38, "vitDefault":35, "agiDefault":32, "lucDefault":35, "playerUses":false },
  "409":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":409, "genusID":25, "name":"[アシェラト]", "devilCost":96, "baseHP":110, "HP":25, "baseMP":110, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":53, "strDefault":37, "intDefault":38, "vitDefault":37, "agiDefault":36, "lucDefault":36, "playerUses":false },
  "410":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":410, "genusID":33, "name":"[ティアマト]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":55, "strDefault":41, "intDefault":42, "vitDefault":38, "agiDefault":35, "lucDefault":36, "playerUses":false },
  "411":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":411, "genusID":31, "name":"[マーヤー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":63, "strDefault":45, "intDefault":45, "vitDefault":42, "agiDefault":39, "lucDefault":43, "playerUses":false },
  "412":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":412, "genusID":45, "name":"[ゴア]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":65, "strDefault":47, "intDefault":47, "vitDefault":42, "agiDefault":37, "lucDefault":45, "playerUses":false },
  "413":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":413, "genusID":1, "name":"[マンセマット]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":66, "strDefault":55, "intDefault":55, "vitDefault":50, "agiDefault":47, "lucDefault":52, "playerUses":false },
  "414":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":414, "genusID":53, "name":"[ゼレーニン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":67, "strDefault":48, "intDefault":47, "vitDefault":44, "agiDefault":40, "lucDefault":45, "playerUses":false },
  "415":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":415, "genusID":54, "name":"[ゼレーニン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":76, "strDefault":57, "intDefault":59, "vitDefault":56, "agiDefault":52, "lucDefault":57, "playerUses":false },
  "416":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":416, "genusID":51, "name":"[ヒメネス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":73, "strDefault":55, "intDefault":55, "vitDefault":50, "agiDefault":47, "lucDefault":52, "playerUses":false },
  "417":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":417, "genusID":49, "name":"[メムアレフ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":76, "strDefault":62, "intDefault":62, "vitDefault":62, "agiDefault":57, "lucDefault":62, "playerUses":false },
  "418":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":418, "genusID":43, "name":"[ゴア]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":10, "strDefault":7, "intDefault":7, "vitDefault":7, "agiDefault":10, "lucDefault":7, "playerUses":false },
  "419":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":419, "genusID":43, "name":"[ヒメネス(C)]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":11, "intDefault":11, "vitDefault":11, "agiDefault":11, "lucDefault":11, "playerUses":false },
  "420":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":420, "genusID":52, "name":"[ヒメネス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":70, "strDefault":50, "intDefault":50, "vitDefault":50, "agiDefault":47, "lucDefault":50, "playerUses":false },
  "421":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":421, "genusID":50, "name":"[メムアレフ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":80, "strDefault":65, "intDefault":65, "vitDefault":65, "agiDefault":60, "lucDefault":65, "playerUses":false },
  "422":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":422, "genusID":28, "name":"[ビフロンス]", "devilCost":89, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":18, "strDefault":13, "intDefault":22, "vitDefault":14, "agiDefault":13, "lucDefault":13, "playerUses":false },
  "423":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":423, "genusID":19, "name":"[ナーガ]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":16, "strDefault":13, "intDefault":13, "vitDefault":13, "agiDefault":13, "lucDefault":13, "playerUses":false },
  "424":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":424, "genusID":29, "name":"[アズミ]", "devilCost":89, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":11, "strDefault":8, "intDefault":9, "vitDefault":7, "agiDefault":11, "lucDefault":8, "playerUses":false },
  "425":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":425, "genusID":31, "name":"[リリム]", "devilCost":93, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":9, "strDefault":7, "intDefault":12, "vitDefault":5, "agiDefault":7, "lucDefault":6, "playerUses":false },
  "426":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":426, "genusID":17, "name":"[カタキラウワ]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":25, "strDefault":19, "intDefault":19, "vitDefault":19, "agiDefault":19, "lucDefault":19, "playerUses":false },
  "427":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":427, "genusID":17, "name":"[カタキラウワ]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":46, "strDefault":32, "intDefault":32, "vitDefault":32, "agiDefault":32, "lucDefault":32, "playerUses":false },
  "428":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":428, "genusID":21, "name":"[ヌエ]", "devilCost":89, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":29, "strDefault":22, "intDefault":20, "vitDefault":18, "agiDefault":18, "lucDefault":19, "playerUses":false },
  "429":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":429, "genusID":36, "name":"[グール]", "devilCost":90, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":26, "strDefault":23, "intDefault":14, "vitDefault":18, "agiDefault":15, "lucDefault":18, "playerUses":false },
  "430":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":430, "genusID":1, "name":"[マンセマット]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":73, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "431":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":431, "genusID":42, "name":"[アンノウン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":1, "strDefault":1, "intDefault":1, "vitDefault":1, "agiDefault":1, "lucDefault":1, "playerUses":false },
  "432":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":432, "genusID":10, "name":"[オンモラキ]", "devilCost":88, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":2, "strDefault":6, "intDefault":6, "vitDefault":6, "agiDefault":9, "lucDefault":8, "playerUses":false },
  "433":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":433, "genusID":18, "name":"[ノッカー]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":1, "strDefault":2, "intDefault":3, "vitDefault":3, "agiDefault":2, "lucDefault":3, "playerUses":false },
  "434":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":434, "genusID":16, "name":"[ダミー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":1, "strDefault":4, "intDefault":4, "vitDefault":4, "agiDefault":6, "lucDefault":5, "playerUses":false },
  "435":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":435, "genusID":28, "name":"[オリアス]", "devilCost":91, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":7, "strDefault":14, "intDefault":9, "vitDefault":10, "agiDefault":10, "lucDefault":11, "playerUses":false },
  "436":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":436, "genusID":28, "name":"[オリアス]", "devilCost":91, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":7, "strDefault":10, "intDefault":5, "vitDefault":7, "agiDefault":6, "lucDefault":7, "playerUses":false },
  "437":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":437, "genusID":29, "name":"[オニ]", "devilCost":93, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":7, "strDefault":8, "intDefault":6, "vitDefault":6, "agiDefault":4, "lucDefault":7, "playerUses":false },
  "438":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":438, "genusID":28, "name":"[メルコム]", "devilCost":95, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":6, "strDefault":4, "intDefault":8, "vitDefault":5, "agiDefault":6, "lucDefault":5, "playerUses":false },
  "439":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":439, "genusID":17, "name":"[カソ]", "devilCost":93, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":4, "strDefault":6, "intDefault":3, "vitDefault":4, "agiDefault":3, "lucDefault":6, "playerUses":false },
  "440":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":440, "genusID":16, "name":"[ピクシー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":2, "strDefault":5, "intDefault":5, "vitDefault":4, "agiDefault":5, "lucDefault":7, "playerUses":false },
  "441":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":441, "genusID":35, "name":"[ノリス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":12, "strDefault":10, "intDefault":10, "vitDefault":10, "agiDefault":10, "lucDefault":10, "playerUses":false },
  "442":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":442, "genusID":31, "name":"[フォーモリア]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":16, "strDefault":11, "intDefault":11, "vitDefault":11, "agiDefault":11, "lucDefault":11, "playerUses":false },
  "443":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":443, "genusID":34, "name":"[マカーブル]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":18, "strDefault":11, "intDefault":11, "vitDefault":11, "agiDefault":11, "lucDefault":11, "playerUses":false },
  "444":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":444, "genusID":29, "name":"[オニ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":7, "strDefault":8, "intDefault":6, "vitDefault":6, "agiDefault":4, "lucDefault":7, "playerUses":false },
  "445":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":445, "genusID":43, "name":"[ヒメネス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":4, "intDefault":4, "vitDefault":4, "agiDefault":4, "lucDefault":4, "playerUses":false },
  "446":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":446, "genusID":45, "name":"[ゴア]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":75, "strDefault":6, "intDefault":3, "vitDefault":4, "agiDefault":3, "lucDefault":4, "playerUses":false },
  "447":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":447, "genusID":34, "name":"[カタチなきもの]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":22, "lucDefault":22, "playerUses":false },
  "448":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":448, "genusID":34, "name":"[カタチなきもの]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":22, "lucDefault":22, "playerUses":false },
  "449":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":449, "genusID":34, "name":"[カタチなきもの]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":22, "lucDefault":22, "playerUses":false },
  "450":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":450, "genusID":34, "name":"[カタチなきもの]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":22, "lucDefault":22, "playerUses":false },
  "451":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":451, "genusID":34, "name":"[カタチなきもの]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":30, "strDefault":22, "intDefault":22, "vitDefault":22, "agiDefault":22, "lucDefault":22, "playerUses":false },
  "452":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":452, "genusID":11, "name":"[マンドレイク]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":43, "strDefault":29, "intDefault":29, "vitDefault":28, "agiDefault":41, "lucDefault":35, "playerUses":false },
  "453":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":453, "genusID":18, "name":"[カワンチャ]", "devilCost":92, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":43, "strDefault":26, "intDefault":44, "vitDefault":29, "agiDefault":26, "lucDefault":26, "playerUses":false },
  "454":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":454, "genusID":25, "name":"[ズェラロンズ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":25, "strDefault":17, "intDefault":16, "vitDefault":20, "agiDefault":19, "lucDefault":18, "playerUses":false },
  "455":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":455, "genusID":33, "name":"[バジリスク]", "devilCost":88, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":33, "strDefault":22, "intDefault":28, "vitDefault":17, "agiDefault":20, "lucDefault":22, "playerUses":false },
  "456":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":456, "genusID":34, "name":"[なぞのあくま]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":50, "strDefault":32, "intDefault":33, "vitDefault":32, "agiDefault":31, "lucDefault":31, "playerUses":false },
  "457":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":457, "genusID":43, "name":"[へいし]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":48, "strDefault":31, "intDefault":31, "vitDefault":31, "agiDefault":31, "lucDefault":31, "playerUses":false },
  "458":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":458, "genusID":43, "name":"[へいしちょう]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":51, "strDefault":33, "intDefault":33, "vitDefault":33, "agiDefault":33, "lucDefault":33, "playerUses":false },
  "459":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":459, "genusID":43, "name":"[ジャック]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":50, "strDefault":35, "intDefault":35, "vitDefault":35, "agiDefault":35, "lucDefault":35, "playerUses":false },
  "460":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":460, "genusID":22, "name":"[グレンデル]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":49, "strDefault":36, "intDefault":31, "vitDefault":33, "agiDefault":26, "lucDefault":31, "playerUses":false },
  "461":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":461, "genusID":43, "name":"[ライアン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":50, "strDefault":35, "intDefault":35, "vitDefault":35, "agiDefault":35, "lucDefault":35, "playerUses":false },
  "462":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":462, "genusID":1, "name":"[イスラフィール]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":63, "strDefault":38, "intDefault":46, "vitDefault":37, "agiDefault":43, "lucDefault":40, "playerUses":false },
  "463":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":463, "genusID":32, "name":"[スルト]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":63, "strDefault":46, "intDefault":40, "vitDefault":43, "agiDefault":36, "lucDefault":39, "playerUses":false },
  "464":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":464, "genusID":25, "name":"[スカディ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":63, "strDefault":46, "intDefault":35, "vitDefault":40, "agiDefault":45, "lucDefault":38, "playerUses":false },
  "465":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":465, "genusID":43, "name":"[マクレイン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":31, "strDefault":24, "intDefault":24, "vitDefault":24, "agiDefault":24, "lucDefault":24, "playerUses":false },
  "466":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":466, "genusID":16, "name":"[ローレライ]", "devilCost":95, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":31, "strDefault":19, "intDefault":26, "vitDefault":19, "agiDefault":22, "lucDefault":17, "playerUses":false },
  "467":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":467, "genusID":41, "name":"[マメダヌキ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":12, "strDefault":8, "intDefault":8, "vitDefault":11, "agiDefault":9, "lucDefault":15, "playerUses":false },
  "468":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":468, "genusID":40, "name":"[カンバリ]", "devilCost":95, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":27, "strDefault":21, "intDefault":17, "vitDefault":21, "agiDefault":20, "lucDefault":17, "playerUses":false },
  "469":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":469, "genusID":39, "name":"[デイビット]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":22, "strDefault":18, "intDefault":18, "vitDefault":17, "agiDefault":18, "lucDefault":20, "playerUses":false },
  "470":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":470, "genusID":4, "name":"[イグドラジル]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":44, "strDefault":36, "intDefault":24, "vitDefault":40, "agiDefault":25, "lucDefault":32, "playerUses":false },
  "471":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":471, "genusID":4, "name":"[イグドラジル]", "devilCost":94, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":44, "strDefault":36, "intDefault":24, "vitDefault":40, "agiDefault":25, "lucDefault":32, "playerUses":false },
  "472":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":472, "genusID":39, "name":"[アリス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":55, "strDefault":36, "intDefault":48, "vitDefault":34, "agiDefault":34, "lucDefault":33, "playerUses":false },
  "473":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":473, "genusID":39, "name":"[マザーハーロット]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":93, "strDefault":60, "intDefault":67, "vitDefault":58, "agiDefault":56, "lucDefault":58, "playerUses":false },
  "474":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":474, "genusID":1, "name":"[ハニエル]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":44, "strDefault":28, "intDefault":36, "vitDefault":29, "agiDefault":33, "lucDefault":31, "playerUses":false },
  "475":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":475, "genusID":1, "name":"[カズフェル]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":44, "strDefault":33, "intDefault":32, "vitDefault":29, "agiDefault":32, "lucDefault":31, "playerUses":false },
  "476":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":476, "genusID":1, "name":"[ハニエル]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":66, "strDefault":41, "intDefault":50, "vitDefault":42, "agiDefault":46, "lucDefault":44, "playerUses":false },
  "477":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":477, "genusID":1, "name":"[カズフェル]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":64, "strDefault":45, "intDefault":44, "vitDefault":41, "agiDefault":44, "lucDefault":43, "playerUses":false },
  "478":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":478, "genusID":27, "name":"[ゾウチョウテン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":39, "strDefault":31, "intDefault":26, "vitDefault":28, "agiDefault":30, "lucDefault":27, "playerUses":false },
  "479":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":479, "genusID":27, "name":"[コウモクテン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":46, "strDefault":34, "intDefault":33, "vitDefault":33, "agiDefault":33, "lucDefault":30, "playerUses":false },
  "480":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":480, "genusID":27, "name":"[ジコクテン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":66, "strDefault":47, "intDefault":43, "vitDefault":42, "agiDefault":46, "lucDefault":45, "playerUses":false },
  "481":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":481, "genusID":27, "name":"[ビシャモンテン]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":67, "strDefault":44, "intDefault":45, "vitDefault":48, "agiDefault":44, "lucDefault":45, "playerUses":false },
  "482":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":482, "genusID":1, "name":"[セラフ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":90, "strDefault":52, "intDefault":64, "vitDefault":54, "agiDefault":56, "lucDefault":59, "playerUses":false },
  "483":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":483, "genusID":32, "name":"[マーラ]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":80, "strDefault":54, "intDefault":55, "vitDefault":52, "agiDefault":53, "lucDefault":51, "playerUses":false },
  "484":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":484, "genusID":48, "name":"[アリラト]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":87, "strDefault":58, "intDefault":57, "vitDefault":57, "agiDefault":57, "lucDefault":57, "playerUses":false },
  "485":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":485, "genusID":9, "name":"[デミウルゴス]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":99, "strDefault":72, "intDefault":72, "vitDefault":72, "agiDefault":72, "lucDefault":72, "playerUses":false },
  "486":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":486, "genusID":39, "name":"[ホワイトライダー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":49, "strDefault":37, "intDefault":31, "vitDefault":33, "agiDefault":38, "lucDefault":33, "playerUses":false },
  "487":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":487, "genusID":39, "name":"[レッドライダー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":59, "strDefault":39, "intDefault":41, "vitDefault":40, "agiDefault":43, "lucDefault":39, "playerUses":false },
  "488":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":488, "genusID":39, "name":"[ブラックライダー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":69, "strDefault":45, "intDefault":49, "vitDefault":43, "agiDefault":50, "lucDefault":45, "playerUses":false },
  "489":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":489, "genusID":39, "name":"[ペイルライダー]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":78, "strDefault":53, "intDefault":49, "vitDefault":51, "agiDefault":54, "lucDefault":52, "playerUses":false },
  "490":{  "attr":[0, 0, 0, 0, 0, 0, 0, 0], "id":490, "genusID":39, "name":"[トランペッター]", "devilCost":96, "baseHP":100, "HP":25, "baseMP":100, "MP":13, "skillDefault":[0, 0, 0, 0, 0, 0], "lvDefault":88, "strDefault":56, "intDefault":58, "vitDefault":57, "agiDefault":57, "lucDefault":63, "playerUses":false }
};//}}}

function createDevilMap(json) {
  var devilMap = [];//{{{
  for (var value in json) {
    devilMap[value] = new Devil(json[value]);
  }
  return devilMap;//}}}
}

// 該当する悪魔を返す
function getDevil(devilID) {//{{{
  return (devilMap[devilID]);
}//}}}

// 悪魔
var devilMap = createDevilMap(devilJSON);
