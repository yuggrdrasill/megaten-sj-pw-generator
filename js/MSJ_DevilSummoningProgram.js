////////////////////////////////////////////////////////////////////////////////////////////////////
// 真・女神転生 ストレンジ ジャーニー 悪魔召還プログラム ver 1.1/02 mod
// (c) http://www20.atwiki.jp/strange_journey/
////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';

// フォームの要素を無効化したり有効化したりする機能追加
jQuery.fn.extend({
  checked:function(){
    return jQuery(this).attr('checked');
  },
  disabled:function(value){
    // 引数がないとき、disabledのときtrueを返す
    if(value===undefined) return $(this).attr("disabled")!==undefined;

    if(value){
      // 引数がtrueのとき、無効化する
      $(this).attr("disabled","disabled");
    } else {
      // 引数がfalseのとき、有効化する
      $(this).removeAttr("disabled");
    }
  }
});


var _ua = (function(){
return {
  ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
  ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
  ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
  IE:document.uniqueID,
  Firefox:window.sidebar,
  Opera:window.opera,
  Webkit:!document.uniqueID && !window.opera && !window.sidebar && window.localStorage && typeof window.orientation == "undefined",
  Mobile:typeof window.orientation != "undefined"
}
})();


// -------------------------------------------------------------------------------------------------
// データ
// -------------------------------------------------------------------------------------------------

/**
 * 威力算出が魔力かどうか判定します。
 */
function isMagicAttackGroup(skill) {
  return skill.attackGroup.id == 1 ? false : true;
}

//}}}

var charMap = "し,ん,い,く,み,Ｂ,や,る,Ｙ,け,ひ,Ｋ,Ｆ,と,Ｈ,む,Ａ,ち,に,Ｚ,き,Ｗ,よ,Ｌ,を,の,た,れ,Ｎ,え,Ｓ,ふ,わ,Ｊ,そ,り,す,Ｃ,め,Ｐ,へ,Ｑ,Ｇ,Ｒ,Ｄ,こ,Ｍ,Ｔ,ま,つ,せ,か,は,Ｅ,Ｕ,て,さ,な,あ,も,ゆ,お,う,ろ".split(",");

var letters = "しんいくみＢやるＹけひＫＦとＨむＡちにＺきＷよＬをのたれＮえＳふわＪそりすＣめＰへＱＧＲＤこＭＴまつせかはＥＵてさなあもゆおうろ";

var currentPatternID = null;

function setPattern(patternID) {
  currentPatternID = patternID;
}

// 準備 OK フラグ
var isReady = false;

function outputMessage(message){
  $('#output-area').html(message);
}
// -------------------------------------------------------------------------------------------------
// 処理
// -------------------------------------------------------------------------------------------------
// 初期化処理
function init() {
  //{{{
  outputMessage("初期化中 ...");

  // パターン初期化
  for (var i in indexMap) {
    if (indexMap[i] != undefined) {
      $('#password-pattern').append('<option value="'+i+'">'+i+'</option>');
    }
  }
  $('#password-pattern').val(170);
  setPattern(170);

  // 能力値リスト初期化
  for (i = 1; i < 100; i++) {
    $('.status').append('<option value="'+i+'">'+i+'</option>');
  }

  createSkillFilterSelectBox();
  createAlignmentFilterSelectBox();

  // 経験値フィールド初期化
  $('#exp').val(0).trigger('change');

  createSkills();

  // 悪魔リスト初期化
  createDevils();
  // 作成したモノを保存
  cloneDevilList();

  outputMessage("初期化完了。");
  isReady = true;
}
//}}}

/**
 * スキルフィルタリスト生成
 */
function createSkillFilterSelectBox() {
  $('#skill-filter').append("<option value='none'>フィルタリング無し</option>");
  for (var i in elementJSON) {
    var option = '<option value="element-'+ elementJSON[i].id+'">'+ elementJSON[i].name +'</option>';
    $('#skill-filter').append(option);
  };
}

function createAlignmentFilterSelectBox(){
  $('#stance-filter').append("<option value='none'>スタンスフィルタ無し</option>");
  for (var i = 0 ,len = stance.length - 1; i <= len ; i++) {
    var option = '<option value="stance-'+ stance[i] +'">'+ stance[i] +'</option>';
    $('#stance-filter').append(option);
  };
}

/**
 * 敵専用チェックボックスを変更した際に呼ぶ関数です。
 * 悪魔リストとスキルリストに敵専用のモノを追加や除去します。
 */
function changeEnemyExclusive() {
  createDevils();
  createSkills();
  // 作成したモノを保存
  cloneDevilList();
}

/**
 * 悪魔のオプションボックスを生成します。
 */
function createDevilOption(devil) {
  var result =
    '<option class="genus-'+ devil.genus.id +
       ' stance-' + devil.genus.stance +
       ' alignment-' + devil.genus.alignment +
       ' " ' +
    'value="' + devil.devilID + '">' + devil.toDetailString() + '</option>';
  return result;
}

/**
 * 悪魔リストを生成します。
 * 敵専用チェックボックスがチェックされている場合、
 * 敵専用のモノを追加します。
 */
function createDevils() {
//{{{
// リストを空にしてから追加しないと重複してしまう
  $('#devil-id').empty();
  var isEnemyExclusive = $('#enemy-exclusive').checked();
  for (i in devilMap) {
    var devil = devilMap[i];
    if (devil.playerUses) {
      $('#devil-id').append(createDevilOption(devil));
    } else if (isEnemyExclusive) {
      // 敵専用チェックされていない限り追加しない
      $('#devil-id').append(createDevilOption(devil));
    }
  }

  //}}}
}

/** * スキルドロップダウンを生成します。
 * 敵専用チェックボックスがチェックされている場合、
 * 敵専用のモノを追加します。
 */
function createSkills() {
  /**
   * デモニカもどき専用スキルか判定します。
   */
  var isSkillDemonikaModoki = function (skillID) {
    return skillID == 228//{{{
      || skillID == 231
      || skillID == 240
      || skillID == 241
      || skillID == 243
    //}}}
  }

  /**
   * スキルデータからオプションエレメントを生成します。
   */
  var createSkillOptionElement = function (skill) {
    var elm = '<option value="'+ skill.skillID +'" '+
      'title ="' + skill.info() +'" '+
      'class = "'+
      ' element-' + skill.element.id +
      ' attack-group-' + skill.attackGroup.id +
      '"'+
      '>' +skill.toDetailString();
    return elm;
  }
  /**
   * 敵専用スキルか判定します。
   */
  var isCheckedEnemyExclusiveSkill = function (skill) {
    return skill.cost != -1
      || isSkillDemonikaModoki(skill.skillID)
      || $('#enemy-exclusive').checked()
  }

  //***********  処理開始
  $('.skills').empty();

  // 追加する
  for (var i in skillMap) {
    var skill = skillMap[i];
    if (isCheckedEnemyExclusiveSkill(skill)) {
      $('#skills-master').append(createSkillOptionElement(skill));
      $('.skills').append(createSkillOptionElement(skill));
    }
  }
}
/**
 *
 */
function toggleStatusMaxMin(select) {
//{{{
  var MAX = 99;
  var MIN = 1;
  select.val() == MAX ? select.val(MIN) : select.val(MAX);
  select.trigger('change');
}
//}}}
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
 *
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
function calculateHP(lv, vit, addNum, upHPPercent, skillList) {
  //{{{
  var resultHP = Math.floor(lv * 6 + vit * 3 * upHPPercent / 100 + addNum);
  resultHP = Math.floor(resultHP * calcHPMPPercent(skillList).totalHPPercent);
  if (resultHP > 999) {
    resultHP = 999;
  }
  return resultHP;
}
//}}}
function calculateMP(lv, int, addNum, upMPPercent, skillList) {
  //{{{
  var resultMP = Math.floor(lv * 3 + int * 2 * upMPPercent / 100 + addNum);
  resultMP = Math.floor(resultMP * calcHPMPPercent(skillList).totalMPPercent);
  if (resultMP > 999) {
    resultMP = 999;
  }
  return resultMP;
}
//}}}

/**
 * 悪魔の既定ステータスを画面へセットします。
 */
function doSetDefault() {
  // 悪魔 ID の入力値を取得//{{{
  var devilID = $('#devil-id').val();

  // 悪魔 ID に対応する悪魔オブジェクトの複製を取得
  var devil = getDevil(devilID).clone();

  // ステータスをセット
  $('#lv').val(devil.lv);
  $('#exp').val(devil.exp);

  // 能力値・実値
  $('#slStr').val(devil.str);
  $('#slInt').val(devil.int);
  $('#slVit').val(devil.vit);
  $('#slAgi').val(devil.agi);
  $('#slLuc').val(devil.luc);

  // 能力値・基準値
  devil = setStatusBase(devil);

  $('.status').trigger('change');

  // スキル
  $('#slSkill0').val(devil.skill[0]);
  $('#slSkill1').val(devil.skill[1]);
  $('#slSkill2').val(devil.skill[2]);
  $('#slSkill3').val(devil.skill[3]);
  $('#slSkill4').val(devil.skill[4]);
  $('#slSkill5').val(devil.skill[5]);
  $('.skills').trigger('change');

  doRefresh()
  //}}}
};

// 入力値更新時の処理
function doRefresh() {
  //{{{
  if (!isReady) {
    return;
  }

  // パターンのセット
  setPattern(eval($('#password-pattern').val()));

  // 悪魔 ID の入力値を取得
  var devilID = $('#devil-id').val();

  // 悪魔 ID に対応する悪魔オブジェクトの複製を取得
  var devil = getDevil(devilID).clone();


  // ステータスをセット
  devil.lv = $('#lv').val();
  devil.exp = $('#exp').val();

  // 能力値・実値
  devil.str = $('#slStr').val();
  devil.int = $('#slInt').val();
  devil.vit = $('#slVit').val();
  devil.agi = $('#slAgi').val();
  devil.luc = $('#slLuc').val();

  devil = setStatusBase(devil);

  // スキル
  devil.skill[0] = $('#slSkill0').val();
  devil.skill[1] = $('#slSkill1').val();
  devil.skill[2] = $('#slSkill2').val();
  devil.skill[3] = $('#slSkill3').val();
  devil.skill[4] = $('#slSkill4').val();
  devil.skill[5] = $('#slSkill5').val();

  devil.HP = calculateHP(devil.lv, devil.vit, devil.addHP, devil.baseHP, devil.skill);
  devil.MP = calculateMP(devil.lv, devil.int, devil.addMP, devil.baseHP, devil.skill);

  setEXPMax(devil);

  // 悪魔情報を取得して表示

  var message = devil.getSimpleInformation().replace(/\n/g,"<br>\n");
  var messegeJSON = createMessageObject(devil);
  var message = templates.output.render(messegeJSON);
  // var message = outputTemplate.render(messegeJSON);
  outputMessage(message);

  var cost = addComma(devil.totalCost)  + ' / ' +  addComma(Math.floor(devil.totalCost / 2));
  $('#info-nowcost').html(cost);

  setModalDialog(devil.toString(),message);
  //}}}
}

function createMessageObject(devil){
  devil.calculateAll();
  var result = devil.clone();

  result.skill[0] = getSkill(result.skill[0]);
  result.skill[1] = getSkill(result.skill[1]);
  result.skill[2] = getSkill(result.skill[2]);
  result.skill[3] = getSkill(result.skill[3]);
  result.skill[4] = getSkill(result.skill[4]);
  result.skill[5] = getSkill(result.skill[5]);
  result.password = generatePassword(result).replace(/\n/g,'<br>');

  return result;
}

function setModalDialog (title,message) {
  $('#data-info-title').html(title);
  $('#data-info-body').html(message);
}

/**
 * 能力値基準値を画面へ設定します。
 * @param {Devil} devil データの入った悪魔クラス
 */
function setStatusBase(devil) {
  // 能力値・基準値
  if ($('#cbBaseEqReal').checked()) {
    // 「□実値と同じ値を使う」チェックボックスがチェックされている場合
    $('#slStrBase').val(devil.strBase = devil.str);
    $('#slIntBase').val(devil.intBase = devil.int);
    $('#slVitBase').val(devil.vitBase = devil.vit);
    $('#slAgiBase').val(devil.agiBase = devil.agi);
    $('#slLucBase').val(devil.lucBase = devil.luc);
  }
  else {
    // 「■実値と同じ値を使う」チェックボックスがチェックされていない場合
    devil.strBase = $('#slStrBase').val();
    devil.intBase = $('#slIntBase').val();
    devil.vitBase = $('#slVitBase').val();
    devil.agiBase = $('#slAgiBase').val();
    devil.lucBase = $('#slLucBase').val();
  }
  return devil;
}

/**
 * 最大経験値を画面に設定します。
 * @param {Devil} devil データの入った悪魔クラス
 */
function setEXPMax(devil) {
  devil.calculateEXPMax();
  $('#exp').attr('max' , devil.expMax);

  //label
  $('#exp-max-label').empty().append(devil.expMax);

  var result = 0;
  var inputEXP = parseInt($('#exp').val());
  if (inputEXP > parseInt(devil.expMax)) {
    result = devil.expMax;
    $('#exp').val(result);
  }
  if (inputEXP < 0) {
    result = 0;
    $('#exp').val(result);
  }
}
// パスワード入力ボタン押下時の処理
function doInput() {
//{{{
  if (!isReady) {
    return;
  }

  var password = $('#password-input-area').val();
  while (password.indexOf("\n") != -1) {
    password = password.replace("\n", "");
  }

  var msg;
  // 文字モード
  if ($('#rbCharMode').checked()) {
    password = password.toUpperCase();
    msg = analyzeCharPassword(password);
  }
  // ビットモード
  else {
    msg = analyzeBitPassword(password);
  }

  $('#message-dialog-area').html(msg.replace(/\n/g,"<br>"));
  $('#message-dialog-area').trigger('change');
  $('select').trigger('change');
}

//}}}
// 入力されたパスワードを解析する (文字モード)
function analyzeCharPassword(password) {
//{{{
  var i;
  var msg = "";

  msg += "> 入力されたパスワード :";
  msg += "\n";
  msg += "" + password;
  msg += "\n";

  // 文字数チェック
  msg += "> パスワード入力文字数チェック ... ";

  // 30 文字未満の場合、エラー
  if (password.length < 31) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードは無効です。";
    msg += "\n";
    msg += "パスワードは 31 文字以上入力してください。";
    msg += "\n";
    return msg;
  }
  // 32 文字を超える場合、警告
  else if (password.length > 32) {
    msg += "WARNING.";
    msg += "\n";
    msg += "パスワードが 33 文字以上入力されました。";
    msg += "\n";
    msg += "33 文字目以降は切り捨てられます。";
    msg += "\n";
    password = password.substr(0, 32);
  }
  // 30 文字以上 32 文字以下の場合、正常
  else {
    msg += "OK."
    msg += "\n";
  }

  // 文字チェック
  msg += "> パスワード入力文字チェック ... ";

  // パスワードをビット列に変換
  var src = "";
  for (i = 0; i < 31; i++) {
    var char = password.charAt(i);
    var value = letters.indexOf(char);

    // 不正な文字の検出
    if (value == -1) {
      msg += "ERROR.";
      msg += "\n";
      msg += "入力されたパスワードは無効です。";
      msg += "\n";
      msg += "不正な文字が含まれています。(" + (i + 1) + "文字目：'" + char + "')";
      msg += "\n";
      return msg;
    }

    src += fillZero(6, eval(value).toString(2));
  }

  msg += "OK.";
  msg += "\n";

  return (analyzePassword(src, msg));
}
//}}}

// 入力されたパスワードを解析する (ビットモード)
function analyzeBitPassword(password) {
//{{{
  var i;
  var msg = "";

  msg += "> 入力されたビット列 :";
  msg += "\n";
  msg += "" + password;
  msg += "\n";

  // 文字数チェック
  msg += "> パスワード入力ビット数チェック ... ";

  // 184 文字未満の場合、エラー
  if (password.length < 184) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードは無効です。";
    msg += "\n";
    msg += "ビットモードのパスワードは 184 ビット以上入力してください。";
    msg += "\n";
    return msg;
  }
  // 192 文字を超える場合、警告
  else if (password.length > 192) {
    msg += "WARNING.";
    msg += "\n";
    msg += "パスワードが 193 ビット以上入力されました。";
    msg += "\n";
    msg += "193 ビット目以降は切り捨てられます。";
    msg += "\n";
    password = password.substr(0, 192);
  }
  // 30 文字以上 32 文字以下の場合、正常
  else {
    msg += "OK.";
    msg += "\n";
  }

  // 文字チェック
  msg += "> パスワード入力文字チェック ... ";

  // パスワード入力文字チェック
  for (i = 0; i < 184; i++) {
    var char = password.charAt(i);
    if (char != "0" && char != "1") {
      msg += "ERROR.";
      msg += "\n";
      msg += "入力されたパスワードは無効です。";
      msg += "\n";
      msg += "不正な文字が含まれています。(" + (i + 1) + "文字目：'" + char + "')";
      msg += "\n";
      return msg;
    }
  }

  msg += "OK.";
  msg += "\n";

  return (analyzePassword(password, msg));
}
//}}}

// 入力されたパスワードを解析する (共通部)
function analyzePassword(srcOld, msgOld) {
//{{{
  var i;
  var src = srcOld;
  var msg = msgOld;

  msg += "> パスワード解析開始 ... "
  msg += "\n";

  // XOR 用のマスク値を取得
  var mask = parseInt(src.substr(22 * 8, 8), 2);

  msg += "パターンNo. = " + mask;
  msg += "\n";

  // バイト値に変換
  var srcBytes = new Array();
  for (i = 0; i < 24; i++) {
    srcBytes[i] = 0;
  }
  for (i = 0; i < 22; i++) {
    srcBytes[i] = parseInt(src.substr(i * 8, 8), 2);
    // マスク値と XOR
    srcBytes[i] ^= mask;
  }
  srcBytes[22] = mask;

  // 未対応パターンならエラー
  if (indexMap[mask] == undefined) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードパターンは未対応です。";
    msg += "\n";
    // デバッグモード時のみデバッグ情報を付加
    if ($('#debug-mode').checked()) {
      msg += "入力されたバイト列 : ";
      msg += "\n";
      for (i = 0; i < 23; i++) {
        //        msg += "" + i + " バイト目 : " + fillZero(8, eval(srcBytes[i]).toString(2));
        msg += fillZero(8, eval(srcBytes[i]).toString(2));
        msg += "\n";
      }
    }
    return msg;
  }

  // パターン No. をセット
  setPattern(mask);

  // 移送後用の配列を初期化する
  var dstBytes = new Array();
  for (i = 0; i < 24; i++) {
    dstBytes[i] = 0;
  }
  // バイト単位で移送
  for (i = 0; i < 22; i++) {
    dstBytes[i] = srcBytes[indexMap[currentPatternID][i]];
  }

  // 移送後バイト配列をビット文字列に変換
  var dst = "";
  for (i = 0; i < 24; i++) {
    dst += fillZero(8, eval(dstBytes[i]).toString(2))
  }

  // 各ステータス値に分割
  var skill = new Array();
  var devilID = parseInt(dst.substr(4, 9), 2);
  var lv = parseInt(dst.substr(13, 7), 2);
  skill[5] = parseInt(dst.substr(20, 9), 2);
  skill[4] = parseInt(dst.substr(29, 9), 2);
  skill[3] = parseInt(dst.substr(38, 9), 2);
  skill[2] = parseInt(dst.substr(47, 9), 2);
  skill[1] = parseInt(dst.substr(56, 9), 2);
  skill[0] = parseInt(dst.substr(65, 9), 2);
  var exp = parseInt(dst.substr(74, 32), 2);
  var intBase = parseInt(dst.substr(106, 7), 2);
  var lucBase = parseInt(dst.substr(113, 7), 2);
  var agiBase = parseInt(dst.substr(120, 7), 2);
  var vitBase = parseInt(dst.substr(127, 7), 2);
  var strBase = parseInt(dst.substr(134, 7), 2);
  var int = parseInt(dst.substr(141, 7), 2);
  var luc = parseInt(dst.substr(148, 7), 2);
  var agi = parseInt(dst.substr(155, 7), 2);
  var vit = parseInt(dst.substr(162, 7), 2);
  var str = parseInt(dst.substr(169, 7), 2);

  // 有効範囲チェックをしながらフォームに適用
  // 悪魔ID (1 ～ 490)
  msg += "悪魔ID      = " + devilID;
  if (1 <= devilID && devilID <= 490) {
    $('#devil-id').val(devilID).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // Lv (1 ～ 99)
  msg += "Lv          = " + lv;
  if (1 <= lv && lv <= 99) {
    $('#slLv').val(lv).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 経験値 (0 ～ 2097151)
  msg += "経験値      = " + exp;
  if (0 <= exp && exp <= 2097151) {
    $('#txExp').val(exp).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (実値) (1 ～ 99)
  msg += "力 (実値)   = " + str;
  if (1 <= str && str <= 99) {
    $('#slStr').val(str).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (実値) (1 ～ 99)
  msg += "魔 (実値)   = " + int;
  if (1 <= int && int <= 99) {
    $('#slInt').val(int).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (実値) (1 ～ 99)
  msg += "体 (実値)   = " + vit;
  if (1 <= vit && vit <= 99) {
    $('#slVit').val(vit).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (実値) (1 ～ 99)
  msg += "速 (実値)   = " + agi;
  if (1 <= agi && agi <= 99) {
    $('#slAgi').val(agi).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (実値) (1 ～ 99)
  msg += "運 (実値)   = " + luc;
  if (1 <= luc && luc <= 99) {
    $('#slLuc').val(luc).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (基準値) (1 ～ 99)
  msg += "力 (基準値) = " + strBase;
  if (1 <= strBase && strBase <= 99) {
    $('#slStrBase').val(strBase).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (基準値) (1 ～ 99)
  msg += "魔 (基準値) = " + intBase;
  if (1 <= intBase && intBase <= 99) {
    $('#slIntBase').val(intBase).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (基準値) (1 ～ 99)
  msg += "体 (基準値) = " + vitBase;
  if (1 <= vitBase && vitBase <= 99) {
    $('#slVitBase').val(vitBase).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (基準値) (1 ～ 99)
  msg += "速 (基準値) = " + agiBase;
  if (1 <= agiBase && agiBase <= 99) {
    $('#slAgiBase').val(agiBase).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (基準値) (1 ～ 99)
  msg += "運 (基準値) = " + lucBase;
  if (1 <= lucBase && lucBase <= 99) {
    $('#slLucBase').val(lucBase).trigger('change');;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[1] (0 ～ 419)
  msg += "スキル[1]   = " + skill[0];
  if (0 <= skill[0] && skill[0] <= 419) {
    $('#slSkill0').val(skill[0]);
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[2] (0 ～ 419)
  msg += "スキル[2]   = " + skill[1];
  if (0 <= skill[1] && skill[1] <= 419) {
    $('#slSkill1').val(skill[1]).trigger('change');
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[3] (0 ～ 419)
  msg += "スキル[3]   = " + skill[2];
  if (0 <= skill[2] && skill[2] <= 419) {
    $('#slSkill2').val(skill[2]).trigger('change');
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[4] (0 ～ 419)
  msg += "スキル[4]   = " + skill[3];
  if (0 <= skill[3] && skill[3] <= 419) {
    $('#slSkill3').val(skill[3]).trigger('change');
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[5] (0 ～ 419)
  msg += "スキル[5]   = " + skill[4];
  if (0 <= skill[4] && skill[4] <= 419) {
    $('#slSkill4').val(skill[4]).trigger('change');
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[6] (0 ～ 419)
  msg += "スキル[6]   = " + skill[5];
  if (0 <= skill[5] && skill[5] <= 419) {
    $('#slSkill5').val(skill[5]).trigger('change');
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  msg += "> 有効範囲内の値をフォームに反映しました。";
  msg += "\n";

  return msg;
}
//}}}
// 指定した悪魔のパスワードを生成して返す。
function generatePassword(devil) {
//{{{
  var i;

  // 各ステータスを 2 進数文字列に変換し、連結する
  var src = fillZero(4, "0")
      + fillZero(9, eval(devil.devilID).toString(2))
      + fillZero(7, eval(devil.lv).toString(2))
      + fillZero(9, eval(devil.skill[5]).toString(2))
      + fillZero(9, eval(devil.skill[4]).toString(2))
      + fillZero(9, eval(devil.skill[3]).toString(2))
      + fillZero(9, eval(devil.skill[2]).toString(2))
      + fillZero(9, eval(devil.skill[1]).toString(2))
      + fillZero(9, eval(devil.skill[0]).toString(2))
      + fillZero(32, eval(devil.exp).toString(2))
      + fillZero(7, eval(devil.intBase).toString(2))
      + fillZero(7, eval(devil.lucBase).toString(2))
      + fillZero(7, eval(devil.agiBase).toString(2))
      + fillZero(7, eval(devil.vitBase).toString(2))
      + fillZero(7, eval(devil.strBase).toString(2))
      + fillZero(7, eval(devil.int).toString(2))
      + fillZero(7, eval(devil.luc).toString(2))
      + fillZero(7, eval(devil.agi).toString(2))
      + fillZero(7, eval(devil.vit).toString(2))
      + fillZero(7, eval(devil.str).toString(2))
      + fillZero(8, eval(currentPatternID).toString(2))
    ;
  var checksum = 0;

  // 1 バイト単位でマスク値と XOR およびチェックサム計算
  var srcBytes = new Array();
  for (i = 0; i < 22; i++) {
    // 8 ビットずつ取得して 10 進数値に変換
    srcBytes[i] = parseInt(src.substr(i * 8, 8), 2);
    // XOR
    srcBytes[i] ^= currentPatternID;
    // チェックサムに加算
    checksum += srcBytes[i];
    checksum %= 256;
  }
  checksum += currentPatternID;
  checksum %= 256;

  // バイト単位で移送
  var dstBytes = new Array();
  for (i = 0; i < 22; i++) {
    dstBytes[indexMap[currentPatternID][i]] = srcBytes[i];
  }

  // 23 バイト目にマスク値をセット
  dstBytes[22] = currentPatternID;

  // 24 バイト目にチェックサムをセット
  dstBytes[23] = checksum;

  // バイト列をビット文字列に変換
  var dst = "";
  for (i = 0; i < 24; i++) {
    dst += fillZero(8, eval(dstBytes[i]).toString(2))
  }

  // ビット列をパスワードに変換
  var password = "";
  for (i = 0; i < 32; i++) {
    // 6 ビットずつ対応する文字に変換して連結する
    var charcode = parseInt(dst.substr(i * 6, 6), 2);
    password += letters.charAt(charcode);
    // 半分で改行
    if (i == 15) {
      password += "\n";
    }
  }

  // 結果文字列
  var result = password;

  //  // デバッグモード時のみデバッグ情報を付加
  //  if ( document.foMain.cbDebugMode.checked ) {
  //    // 8bit 単位に bit 列を分割
  //    var part8Info = "";
  //    for ( i in part8Array ) {
  //      part8Info += part8Array[i] + " " + parseInt(part8Array[i], 2) + "\n";
  //      if ( i % 3 == 2 ) {
  //        part8Info += "\n";
  //      }
  //    }
  //    var debugInfo = "【デバッグ情報】";
  //    debugInfo += "\n";
  //    debugInfo += "・8bit 単位のビット列 (チェックサム部分を除く)";
  //    debugInfo += "\n";
  //    debugInfo += part8Info;
  //    debugInfo += "\n";
  ////    debugInfo += "総計 : ";
  ////    debugInfo += "\n";
  ////    debugInfo += fillZero(8, eval(checksum).toString(2)) + " " + checksum;
  ////    debugInfo += "\n";
  ////    debugInfo += "bitごとの総計 : ";
  ////    debugInfo += "\n";
  ////    debugInfo += fillZero(8, eval(bitsumAll).toString(2)) + " " + bitsumAll;
  ////    debugInfo += "\n";
  ////    debugInfo += bitsum;
  //
  //    result += "\n\n";
  //    result += debugInfo;
  //  }

  return result;
}
//}}}
// 指定桁数での前方 0 埋め
function fillZero(place, value) {
//{{{
  var i;
  for (i = value.length; i < place; i++) {
    value = "0" + value;
    if (i < 0) {
      return;
    }
  }

  return value;
}
//}}}

// 指定桁数での後方 0 埋め
function fillZeroAfter(place, value) {
//{{{
  var i;
  for (i = value.length; i < place; i++) {
    value = value + "0";
  }

  return value;
}
//}}}

function addComma(str) {
  var num = new String(str).replace(/,/g, '');
  while (num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
  if (num == undefined) {
    return str;
  }
  return num;
}
// -------------------------------------------------------------------------------------------------
// パターンクラス
// -------------------------------------------------------------------------------------------------
function Pattern(charList, indexArray, xorbit) {
  this.indexArray = indexArray;//{{{
  this.b2cMap = charList.split(",");
  this.c2bMap = null;
  this.xorbit = xorbit;

  this.init = function () {
    this.c2bMap = new Array();
    var i;
    for (i in this.b2cMap) {
      this.c2bMap[this.b2cMap[i]] = i;
    }
  };
}
//}}}

var skillFiltering = function () {
  var filterName = $("#skill-filter").val();
  var filterClass = "."+filterName;
  var selecter = ".skills option";
  var options = $(selecter);
  var target = $(selecter).filter(filterClass);
  var other = $(selecter).not(filterClass);

  options.removeClass('highlight');
  options.show();
  options.css({
    visibility: 'visible'
  });

  if (filterName != "none") {
    if(_ua.Firefox){
      other.hide();
    } else {
      other.css({
        visibility: 'hidden'
      });
      target.addClass('highlight');
    }
  }
};

function stanceFiltering () {
  var elm = $('#stance-filter');
  var filterName = '.' + elm.val();
  if(filterName === ".none"){
    $('#devil-id').empty().append($('#devils-clone option').clone());
  } else {
    $('#devil-id').empty().append($('#devils-clone').clone().find(filterName));
  }
}

function cloneDevilList () {
  $('#devils-clone').append($('#devil-id option').clone());
}


var View = (function () {
  var _setTooltip = function (selector,message) {
    $(selector).attr('title',message);
  };

  var _toggleStatusBaseSelectDisabled = function(){
    var status = $('.status-base');
    if($('#cbBaseEqReal').checked()){
      // 連動チェックされたので無効化
      status.each(function (index,value) {
        $(value).disabled(true);
        var id = $(value).attr('id');
        // スライダーも一緒に無効化
        $('#'+id + '-slider' ).slider( "option", "disabled", true );
      });
    } else {
      //有効化
      status.each(function (index,value) {
        $(value).disabled(false);
        var id = $(value).attr('id');
        $('#'+id + '-slider' ).slider( "option", "disabled", false );
      });

    }
  };

  return {
    setTooltip:_setTooltip,
    toggleStatusBaseSelectDisabled:_toggleStatusBaseSelectDisabled
  }
}());

function createSliders(){
  // スライダー作成
  $('.status').each(function (index,val) {
      var select = $(val);
      var id = $(val).attr('id');
      var slider = $( "<div id='"+ id +"-slider' class='status-slider'></div>" ).insertAfter( select ).slider({
          min: 1,
          max: 99,
          range: "min",
          value: select[ 0 ].selectedIndex + 1,
          slide: function( event, ui ) {
              select.val(ui.value);
              doRefresh();
          }
      });

      //スライダーと値を連動させる
      select.on('change',function () {
        var id = $(this).attr('id');
        var slider = $('#' +id+'-slider');
        var val = $(this).val();
        slider.slider({'value':val});
      })
  });

  $('#txExp').each(function (index,value) {
  })
}

function hookStatusChange () {
  $('select').on('change' ,function () {
    doRefresh();
  });
  $('#cbBaseEqReal').on('change',(function () {
    View.toggleStatusBaseSelectDisabled();
    $('.status').trigger('change');
    $('.status-slider').trigger('change');
    doRefresh();
  }));
  $('#exp').on('change',(function () {
    doRefresh();
  }));
  $('#password-pattern').on('change',(function () {
    doRefresh();
  }));
  $('#message-dialog-area').on('change',(function () {
    $('#message-dialog').modal();
  }));
}

function hookChangeEnemyExclusive () {
  $('#enemy-exclusive').on('change',(function () {
    changeEnemyExclusive();
    $('#stance-filter').trigger('change');
  }));
}

function hookFilters () {
  $('#stance-filter').on('change',function () {
    stanceFiltering();
  })
  $('#skill-filter').on('change',function(){
    skillFiltering()
  });
}

function hookToggleStatusMaxMin () {
  var statusNames = [
    "slStr","slInt","slVit",'slAgi','slLuc',
    'slStrBase','slIntBase','slVitBase','slAgiBase','slLucBase'
    ];
  for (var i = 0; i < statusNames.length; i++) {
    $('label[for="'+ statusNames[i] +'"]').on("dblclick", function () {
      toggleStatusMaxMin($('#'+$(this).attr("for")));
    });
  };
}

function hookSetDefault () {
  $('#set-default').on('click',(function () {
    doSetDefault()
  }));
}

function hookPasswordParse () {
  $('#password-parse').click(function () {
    doInput();
  });
}

// event binds
$(function () {
  init();

  View.setTooltip(
    ".status-label",
    "ラベルをダブルクリックすると99になります。\n"+
      "すでに99の場合は1になります。"
  );

  createSliders();
  hookStatusChange();
  hookChangeEnemyExclusive();
  hookFilters();
  hookSetDefault();
  hookPasswordParse();
  hookToggleStatusMaxMin();
});
