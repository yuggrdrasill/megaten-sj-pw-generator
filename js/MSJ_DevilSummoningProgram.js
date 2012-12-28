////////////////////////////////////////////////////////////////////////////////////////////////////
// 真・女神転生 ストレンジ ジャーニー 悪魔召還プログラム ver 1.1/02 mod
// (c) http://www20.atwiki.jp/strange_journey/
////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
jQuery.fn.checked = function(){
  return jQuery(this).attr('checked');
}

// -------------------------------------------------------------------------------------------------
// データ
// -------------------------------------------------------------------------------------------------
// 属性
var attrMap = new Array();
attrMap[0] = "？";//{{{
attrMap[1] = "－";
attrMap[2] = "弱";
attrMap[3] = "耐";
attrMap[4] = "無";
attrMap[5] = "反";
attrMap[6] = "吸";//}}}

// 種族
var genusMap = new Array();
genusMap["0"] = new Genus(0, "-", "-");//{{{ 種族
genusMap["1"] = new Genus(1, "大天使", "大天");
genusMap["2"] = new Genus(2, "女神", "女神");
genusMap["3"] = new Genus(3, "霊鳥", "霊鳥");
genusMap["4"] = new Genus(4, "神樹", "神樹");
genusMap["5"] = new Genus(5, "天使", "天使");
genusMap["6"] = new Genus(6, "妖鳥", "妖鳥");
genusMap["7"] = new Genus(7, "妖魔", "妖魔");
genusMap["8"] = new Genus(8, "天女", "天女");
genusMap["9"] = new Genus(9, "邪神", "邪神");
genusMap["10"] = new Genus(10, "凶鳥", "凶鳥");
genusMap["11"] = new Genus(11, "妖樹", "妖樹");
genusMap["12"] = new Genus(12, "魔神", "魔神");
genusMap["13"] = new Genus(13, "神獣", "神獣");
genusMap["14"] = new Genus(14, "聖獣", "聖獣");
genusMap["15"] = new Genus(15, "幻魔", "幻魔");
genusMap["16"] = new Genus(16, "妖精", "妖精");
genusMap["17"] = new Genus(17, "魔獣", "魔獣");
genusMap["18"] = new Genus(18, "地霊", "地霊");
genusMap["19"] = new Genus(19, "龍王", "龍王");
genusMap["20"] = new Genus(20, "死神", "死神");
genusMap["21"] = new Genus(21, "妖獣", "妖獣");
genusMap["22"] = new Genus(22, "邪鬼", "邪鬼");
genusMap["23"] = new Genus(23, "妖虫", "妖虫");
genusMap["24"] = new Genus(24, "破壊神", "破壊");
genusMap["25"] = new Genus(25, "地母神", "地母");
genusMap["26"] = new Genus(26, "龍神", "龍神");
genusMap["27"] = new Genus(27, "鬼神", "鬼神");
genusMap["28"] = new Genus(28, "堕天使", "堕天");
genusMap["29"] = new Genus(29, "妖鬼", "妖鬼");
genusMap["30"] = new Genus(30, "鬼女", "鬼女");
genusMap["31"] = new Genus(31, "夜魔", "夜魔");
genusMap["32"] = new Genus(32, "魔王", "魔王");
genusMap["33"] = new Genus(33, "邪龍", "邪龍");
genusMap["34"] = new Genus(34, "悪霊", "悪霊");
genusMap["35"] = new Genus(35, "外道", "外道");
genusMap["36"] = new Genus(36, "幽鬼", "幽鬼");
genusMap["38"] = new Genus(38, "精霊", "精霊");
genusMap["39"] = new Genus(39, "魔人", "魔人");
genusMap["40"] = new Genus(40, "秘神", "秘神");
genusMap["41"] = new Genus(41, "珍獣", "珍獣");
genusMap["42"] = new Genus(42, "狂神", "狂神");
genusMap["43"] = new Genus(43, "人間", "人間");
genusMap["44"] = new Genus(44, "御魂", "御魂");
genusMap["45"] = new Genus(45, "超人", "超人");
genusMap["48"] = new Genus(48, "威霊", "威霊");
genusMap["49"] = new Genus(49, "大霊母", "大霊");
genusMap["50"] = new Genus(50, "虚大霊", "虚大");
genusMap["51"] = new Genus(51, "覚醒人", "覚醒");
genusMap["52"] = new Genus(52, "大地人", "大地");
genusMap["53"] = new Genus(53, "審判者", "審判");
genusMap["54"] = new Genus(54, "聖柱", "聖柱");
genusMap["55"] = new Genus(55, "偽人", "偽人");//}}}

var elementJSON = ({ // {{{ 攻撃属性データ
  0:{ id:0, name:"特殊" },
  1:{ id:1, name:"物理" },
  2:{ id:2, name:"銃" },
  3:{ id:3, name:"火炎" },
  4:{ id:4, name:"氷結" },
  5:{ id:5, name:"電撃" },
  6:{ id:6, name:"疾風" },
  7:{ id:7, name:"破魔" },
  8:{ id:8, name:"呪殺" },
  9:{ id:9, name:"万能" },
  10:{ id:10, name:"状態異常" },
  11:{ id:11, name:"回復" },
  12:{ id:12, name:"補助" },
  13:{ id:13, name:"自動" }
});
// }}}
var attackGroup = ({//{{{ 攻撃威力算出分類
  0:{id:0, name:''},
  1:{id:1, name:'物理'},
  2:{id:2, name:'魔法'}
})//}}}

/**
 * 威力算出が魔力かどうか判定します。
 */
function isAttackGroupMagic(skill) {
  return skill.attackGroup.id == 1 ? false : true;
}

var skillJSON = ({ /// {{{
  0:{id:0, name:"－", cost:0, element:elementJSON[0], attackGroup:attackGroup[2]},
  1:{id:1, name:"アギ", cost:112, element:elementJSON[3], attackGroup:attackGroup[2]},
  2:{id:2, name:"アギラオ", cost:347, element:elementJSON[3], attackGroup:attackGroup[2]},
  3:{id:3, name:"アギダイン", cost:3020, element:elementJSON[3], attackGroup:attackGroup[2]},
  4:{id:4, name:"マハラギ", cost:155, element:elementJSON[3], attackGroup:attackGroup[2]},
  5:{id:5, name:"マハラギオン", cost:952, element:elementJSON[3], attackGroup:attackGroup[2]},
  6:{id:6, name:"マハラギダイン", cost:10972, element:elementJSON[3], attackGroup:attackGroup[2]},
  7:{id:7, name:"ファイアブレス", cost:347, element:elementJSON[3], attackGroup:attackGroup[2]},
  8:{id:8, name:"トリスアギオン", cost:21943, element:elementJSON[3], attackGroup:attackGroup[2]},
  9:{id:9, name:"ラグナロク", cost:87772, element:elementJSON[3], attackGroup:attackGroup[2]},
  10:{id:10, name:"ブフ", cost:112, element:elementJSON[4], attackGroup:attackGroup[2]},
  11:{id:11, name:"ブフーラ", cost:347, element:elementJSON[4], attackGroup:attackGroup[2]},
  12:{id:12, name:"ブフダイン", cost:3020, element:elementJSON[4], attackGroup:attackGroup[2]},
  13:{id:13, name:"マハブフ", cost:155, element:elementJSON[4], attackGroup:attackGroup[2]},
  14:{id:14, name:"マハブフーラ", cost:952, element:elementJSON[4], attackGroup:attackGroup[2]},
  15:{id:15, name:"マハブフダイン", cost:10972, element:elementJSON[4], attackGroup:attackGroup[2]},
  16:{id:16, name:"アイスブレス", cost:347, element:elementJSON[4], attackGroup:attackGroup[2]},
  17:{id:17, name:"絶対零度", cost:21943, element:elementJSON[4], attackGroup:attackGroup[2]},
  18:{id:18, name:"大冷界", cost:87772, element:elementJSON[4], attackGroup:attackGroup[2]},
  19:{id:19, name:"ジオ", cost:112, element:elementJSON[5], attackGroup:attackGroup[2]},
  20:{id:20, name:"ジオンガ", cost:347, element:elementJSON[5], attackGroup:attackGroup[2]},
  21:{id:21, name:"ジオダイン", cost:3020, element:elementJSON[5], attackGroup:attackGroup[2]},
  22:{id:22, name:"マハジオ", cost:155, element:elementJSON[5], attackGroup:attackGroup[2]},
  23:{id:23, name:"マハジオンガ", cost:952, element:elementJSON[5], attackGroup:attackGroup[2]},
  24:{id:24, name:"マハジオダイン", cost:10972, element:elementJSON[5], attackGroup:attackGroup[2]},
  25:{id:25, name:"放電", cost:347, element:elementJSON[5], attackGroup:attackGroup[2]},
  26:{id:26, name:"真理の雷", cost:21943, element:elementJSON[5], attackGroup:attackGroup[2]},
  27:{id:27, name:"魅惑の雷撃", cost:87772, element:elementJSON[5], attackGroup:attackGroup[2]},
  28:{id:28, name:"ガル", cost:112, element:elementJSON[6], attackGroup:attackGroup[2]},
  29:{id:29, name:"ガルーラ", cost:347, element:elementJSON[6], attackGroup:attackGroup[2]},
  30:{id:30, name:"ガルダイン", cost:3020, element:elementJSON[6], attackGroup:attackGroup[2]},
  31:{id:31, name:"マハガル", cost:155, element:elementJSON[6], attackGroup:attackGroup[2]},
  32:{id:32, name:"マハガルーラ", cost:952, element:elementJSON[6], attackGroup:attackGroup[2]},
  33:{id:33, name:"マハガルダイン", cost:10972, element:elementJSON[6], attackGroup:attackGroup[2]},
  34:{id:34, name:"ウインドブレス", cost:347, element:elementJSON[6], attackGroup:attackGroup[2]},
  35:{id:35, name:"殺風激", cost:21943, element:elementJSON[6], attackGroup:attackGroup[2]},
  36:{id:36, name:"妖花烈風", cost:87772, element:elementJSON[6], attackGroup:attackGroup[2]},
  37:{id:37, name:"メギド", cost:952, element:elementJSON[9], attackGroup:attackGroup[2]},
  38:{id:38, name:"メギドラ", cost:10972, element:elementJSON[9], attackGroup:attackGroup[2]},
  39:{id:39, name:"メギドラオン", cost:43886, element:elementJSON[9], attackGroup:attackGroup[2]},
  40:{id:40, name:"ビッグバン", cost:87772, element:elementJSON[9], attackGroup:attackGroup[2]},
  41:{id:41, name:"ジハード", cost:175543, element:elementJSON[9], attackGroup:attackGroup[2]},
  42:{id:42, name:"バビロンの杯", cost:175543, element:elementJSON[9], attackGroup:attackGroup[2]},
  43:{id:43, name:"天罰", cost:3020, element:elementJSON[9], attackGroup:attackGroup[2]},
  44:{id:44, name:"ジャッジメント", cost:3020, element:elementJSON[9], attackGroup:attackGroup[2]},
  45:{id:45, name:"混沌の海", cost:3020, element:elementJSON[9], attackGroup:attackGroup[2]},
  46:{id:46, name:"特攻", cost:1666, element:elementJSON[9], attackGroup:attackGroup[2]},
  47:{id:47, name:"自爆", cost:5663, element:elementJSON[9], attackGroup:attackGroup[2]},
  48:{id:48, name:"吸血", cost:564, element:elementJSON[9], attackGroup:attackGroup[2]},
  49:{id:49, name:"吸魔", cost:1666, element:elementJSON[9], attackGroup:attackGroup[2]},
  50:{id:50, name:"エナジードレイン", cost:21943, element:elementJSON[9], attackGroup:attackGroup[2]},
  51:{id:51, name:"運命の角笛", cost:1666, element:elementJSON[0], attackGroup:attackGroup[2]},
  52:{id:52, name:"永眠への誘い", cost:10972, element:elementJSON[9], attackGroup:attackGroup[2]},
  53:{id:53, name:"ムド", cost:155, element:elementJSON[8], attackGroup:attackGroup[2]},
  54:{id:54, name:"ムドオン", cost:347, element:elementJSON[8], attackGroup:attackGroup[2]},
  55:{id:55, name:"マハムド", cost:952, element:elementJSON[8], attackGroup:attackGroup[2]},
  56:{id:56, name:"マハムドオン", cost:3020, element:elementJSON[8], attackGroup:attackGroup[2]},
  57:{id:57, name:"死んでくれる？", cost:21943, element:elementJSON[8], attackGroup:attackGroup[2]},
  58:{id:58, name:"ハマ", cost:155, element:elementJSON[7], attackGroup:attackGroup[2]},
  59:{id:59, name:"ハマオン", cost:347, element:elementJSON[7], attackGroup:attackGroup[2]},
  60:{id:60, name:"マハンマ", cost:952, element:elementJSON[7], attackGroup:attackGroup[2]},
  61:{id:61, name:"マハンマオン", cost:3020, element:elementJSON[7], attackGroup:attackGroup[2]},
  62:{id:62, name:"審判の光", cost:21943, element:elementJSON[7], attackGroup:attackGroup[2]},
  63:{id:63, name:"ドルミナー", cost:112, element:elementJSON[10], attackGroup:attackGroup[0]},
  64:{id:64, name:"子守唄", cost:564, element:elementJSON[10], attackGroup:attackGroup[0]},
  65:{id:65, name:"ポイズマ", cost:112, element:elementJSON[10], attackGroup:attackGroup[0]},
  66:{id:66, name:"毒ガスブレス", cost:564, element:elementJSON[10], attackGroup:attackGroup[0]},
  67:{id:67, name:"シバブー", cost:155, element:elementJSON[10], attackGroup:attackGroup[0]},
  68:{id:68, name:"バインドボイス", cost:952, element:elementJSON[10], attackGroup:attackGroup[0]},
  69:{id:69, name:"マリンカリン", cost:155, element:elementJSON[10], attackGroup:attackGroup[0]},
  70:{id:70, name:"ファイナルヌード", cost:952, element:elementJSON[10], attackGroup:attackGroup[0]},
  71:{id:71, name:"石化の呪い", cost:222, element:elementJSON[10], attackGroup:attackGroup[0]},
  72:{id:72, name:"石化ブレス", cost:1666, element:elementJSON[10], attackGroup:attackGroup[0]},
  73:{id:73, name:"ポパスマ", cost:112, element:elementJSON[10], attackGroup:attackGroup[0]},
  74:{id:74, name:"戦慄の眼光", cost:564, element:elementJSON[10], attackGroup:attackGroup[0]},
  75:{id:75, name:"マカジャマ", cost:112, element:elementJSON[10], attackGroup:attackGroup[0]},
  76:{id:76, name:"トリッキーダンス", cost:564, element:elementJSON[10], attackGroup:attackGroup[0]},
  77:{id:77, name:"[ダウノマ]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  78:{id:78, name:"[渇きの海]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  79:{id:79, name:"[バイツァ・ダスト]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  80:{id:80, name:"[シャッフラー]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  81:{id:81, name:"[太古の呪怨]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  82:{id:82, name:"忌念の戦慄", cost:43886, element:elementJSON[10], attackGroup:attackGroup[0]},
  83:{id:83, name:"[怪光線]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  84:{id:84, name:"[大怪光線]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  85:{id:85, name:"[マッカビーム]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  86:{id:86, name:"[宵越し銭金]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  87:{id:87, name:"[魂砕波]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  101:{id:101, name:"ディア", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  102:{id:102, name:"ディアラマ", cost:564, element:elementJSON[11], attackGroup:attackGroup[2]},
  103:{id:103, name:"ディアラハン", cost:5663, element:elementJSON[11], attackGroup:attackGroup[2]},
  104:{id:104, name:"メディア", cost:222, element:elementJSON[11], attackGroup:attackGroup[2]},
  105:{id:105, name:"メディラマ", cost:1666, element:elementJSON[11], attackGroup:attackGroup[2]},
  106:{id:106, name:"メディアラハン", cost:21943, element:elementJSON[11], attackGroup:attackGroup[2]},
  107:{id:107, name:"メシアライザー", cost:175543, element:elementJSON[11], attackGroup:attackGroup[2]},
  108:{id:108, name:"パトラ", cost:155, element:elementJSON[11], attackGroup:attackGroup[2]},
  109:{id:109, name:"メパトラ", cost:347, element:elementJSON[11], attackGroup:attackGroup[2]},
  110:{id:110, name:"ポズムディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  111:{id:111, name:"パララディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  112:{id:112, name:"チャームディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  113:{id:113, name:"ペトラディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  114:{id:114, name:"クロズディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  115:{id:115, name:"ダウンディ", cost:222, element:elementJSON[11], attackGroup:attackGroup[2]},
  116:{id:116, name:"ボムディ", cost:112, element:elementJSON[11], attackGroup:attackGroup[2]},
  117:{id:117, name:"アムリタ", cost:1666, element:elementJSON[11], attackGroup:attackGroup[2]},
  118:{id:118, name:"リカーム", cost:564, element:elementJSON[11], attackGroup:attackGroup[2]},
  119:{id:119, name:"サマリカーム", cost:10972, element:elementJSON[11], attackGroup:attackGroup[2]},
  120:{id:120, name:"リカームドラ", cost:43886, element:elementJSON[11], attackGroup:attackGroup[2]},
  121:{id:121, name:"タルカジャ", cost:347, element:elementJSON[12], attackGroup:attackGroup[0]},
  122:{id:122, name:"スクカジャ", cost:347, element:elementJSON[12], attackGroup:attackGroup[0]},
  123:{id:123, name:"ラクカジャ", cost:347, element:elementJSON[12], attackGroup:attackGroup[0]},
  124:{id:124, name:"ラスタキャンディ", cost:5663, element:elementJSON[12], attackGroup:attackGroup[0]},
  125:{id:125, name:"デカジャ", cost:952, element:elementJSON[12], attackGroup:attackGroup[0]},
  126:{id:126, name:"タルンダ", cost:222, element:elementJSON[12], attackGroup:attackGroup[0]},
  127:{id:127, name:"スクンダ", cost:222, element:elementJSON[12], attackGroup:attackGroup[0]},
  128:{id:128, name:"ラクンダ", cost:222, element:elementJSON[12], attackGroup:attackGroup[0]},
  129:{id:129, name:"ランダマイザ", cost:3020, element:elementJSON[12], attackGroup:attackGroup[0]},
  130:{id:130, name:"デクンダ", cost:952, element:elementJSON[12], attackGroup:attackGroup[0]},
  131:{id:131, name:"静寂の祈り", cost:10972, element:elementJSON[12], attackGroup:attackGroup[0]},
  133:{id:133, name:"雄叫び", cost:1666, element:elementJSON[12], attackGroup:attackGroup[0]},
  134:{id:134, name:"フォッグブレス", cost:1666, element:elementJSON[12], attackGroup:attackGroup[0]},
  135:{id:135, name:"溶解ブレス", cost:1666, element:elementJSON[12], attackGroup:attackGroup[0]},
  136:{id:136, name:"挑発", cost:952, element:elementJSON[12], attackGroup:attackGroup[0]},
  137:{id:137, name:"天命反転", cost:10972, element:elementJSON[12], attackGroup:attackGroup[0]},
  138:{id:138, name:"魂捧げの夜伽", cost:952, element:elementJSON[12], attackGroup:attackGroup[0]},
  139:{id:139, name:"テトラカーン", cost:10972, element:elementJSON[12], attackGroup:attackGroup[0]},
  140:{id:140, name:"マカラカーン", cost:10972, element:elementJSON[12], attackGroup:attackGroup[0]},
  141:{id:141, name:"テトラジャ", cost:3020, element:elementJSON[12], attackGroup:attackGroup[0]},
  142:{id:142, name:"チャージ", cost:1666, element:elementJSON[12], attackGroup:attackGroup[0]},
  143:{id:143, name:"コンセントレイト", cost:1666, element:elementJSON[12], attackGroup:attackGroup[0]},
  144:{id:144, name:"捧魂の法", cost:10972, element:elementJSON[12], attackGroup:attackGroup[0]},
  145:{id:145, name:"ロストワード", cost:10972, element:elementJSON[0], attackGroup:attackGroup[2]},
  146:{id:146, name:"サバトマ", cost:952, element:elementJSON[12], attackGroup:attackGroup[0]},
  147:{id:147, name:"招来の舞踏", cost:43886, element:elementJSON[12], attackGroup:attackGroup[0]},
  151:{id:151, name:"突撃", cost:112, element:elementJSON[1], attackGroup:attackGroup[1]},
  152:{id:152, name:"爆砕拳", cost:347, element:elementJSON[1], attackGroup:attackGroup[1]},
  153:{id:153, name:"モータルジハード", cost:1666, element:elementJSON[1], attackGroup:attackGroup[1]},
  154:{id:154, name:"暴れまくり", cost:952, element:elementJSON[1], attackGroup:attackGroup[1]},
  155:{id:155, name:"メガトンプレス", cost:10972, element:elementJSON[1], attackGroup:attackGroup[1]},
  156:{id:156, name:"狂気の粉砕", cost:43886, element:elementJSON[1], attackGroup:attackGroup[1]},
  157:{id:157, name:"三日月斬り", cost:112, element:elementJSON[1], attackGroup:attackGroup[1]},
  158:{id:158, name:"渾身脳天割り", cost:347, element:elementJSON[1], attackGroup:attackGroup[1]},
  159:{id:159, name:"怪力乱神", cost:1666, element:elementJSON[1], attackGroup:attackGroup[1]},
  160:{id:160, name:"ヒートウェイブ", cost:155, element:elementJSON[1], attackGroup:attackGroup[1]},
  161:{id:161, name:"デスバウンド", cost:564, element:elementJSON[1], attackGroup:attackGroup[1]},
  162:{id:162, name:"冥界破", cost:5663, element:elementJSON[1], attackGroup:attackGroup[1]},
  163:{id:163, name:"引っ掻き", cost:112, element:elementJSON[1], attackGroup:attackGroup[1]},
  164:{id:164, name:"メガクロー", cost:347, element:elementJSON[1], attackGroup:attackGroup[1]},
  165:{id:165, name:"虚空爪激", cost:1666, element:elementJSON[1], attackGroup:attackGroup[1]},
  166:{id:166, name:"大切断", cost:155, element:elementJSON[1], attackGroup:attackGroup[1]},
  167:{id:167, name:"アクセルクロー", cost:564, element:elementJSON[1], attackGroup:attackGroup[1]},
  168:{id:168, name:"狂乱の剛爪", cost:5663, element:elementJSON[1], attackGroup:attackGroup[1]},
  169:{id:169, name:"牙折り", cost:155, element:elementJSON[1], attackGroup:attackGroup[1]},
  170:{id:170, name:"成仏の拳", cost:222, element:elementJSON[1], attackGroup:attackGroup[1]},
  171:{id:171, name:"狂気の暴虐", cost:1666, element:elementJSON[1], attackGroup:attackGroup[1]},
  172:{id:172, name:"[ナックルボム]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  173:{id:173, name:"奇襲", cost:952, element:elementJSON[1], attackGroup:attackGroup[1]},
  174:{id:174, name:"月影", cost:564, element:elementJSON[1], attackGroup:attackGroup[1]},
  175:{id:175, name:"残影", cost:564, element:elementJSON[1], attackGroup:attackGroup[1]},
  176:{id:176, name:"ベノンザッパー", cost:1666, element:elementJSON[1], attackGroup:attackGroup[1]},
  177:{id:177, name:"奥義一閃", cost:21943, element:elementJSON[1], attackGroup:attackGroup[1]},
  178:{id:178, name:"麻痺引っ掻き", cost:222, element:elementJSON[1], attackGroup:attackGroup[1]},
  179:{id:179, name:"毒引っ掻き", cost:155, element:elementJSON[1], attackGroup:attackGroup[1]},
  180:{id:180, name:"九十九針", cost:112, element:elementJSON[2], attackGroup:attackGroup[2]},
  181:{id:181, name:"地獄突き", cost:347, element:elementJSON[2], attackGroup:attackGroup[2]},
  182:{id:182, name:"グランドタック", cost:1666, element:elementJSON[2], attackGroup:attackGroup[2]},
  183:{id:183, name:"至高の魔弾", cost:87772, element:elementJSON[2], attackGroup:attackGroup[2]},
  184:{id:184, name:"八百万針", cost:222, element:elementJSON[2], attackGroup:attackGroup[2]},
  185:{id:185, name:"アローレイン", cost:564, element:elementJSON[2], attackGroup:attackGroup[2]},
  186:{id:186, name:"天扇弓", cost:5663, element:elementJSON[2], attackGroup:attackGroup[2]},
  187:{id:187, name:"夢見針", cost:155, element:elementJSON[2], attackGroup:attackGroup[2]},
  188:{id:188, name:"毒針", cost:222, element:elementJSON[2], attackGroup:attackGroup[2]},
  189:{id:189, name:"ピーターパイパー", cost:347, element:elementJSON[2], attackGroup:attackGroup[2]},
  190:{id:190, name:"魅了突き", cost:347, element:elementJSON[2], attackGroup:attackGroup[2]},
  191:{id:191, name:"切なさ乱れ撃ち", cost:1666, element:elementJSON[2], attackGroup:attackGroup[2]},
  192:{id:192, name:"刹那五月雨撃ち", cost:43886, element:elementJSON[2], attackGroup:attackGroup[2]},
  201:{id:201, name:"[火炎撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  202:{id:202, name:"[猛炎撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  203:{id:203, name:"[豪炎撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  204:{id:204, name:"[火炎乱撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  205:{id:205, name:"[猛炎乱撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  206:{id:206, name:"[豪炎乱撃]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  207:{id:207, name:"[氷結撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  208:{id:208, name:"[猛氷撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  209:{id:209, name:"[豪氷撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  210:{id:210, name:"[氷結乱撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  211:{id:211, name:"[猛氷乱撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  212:{id:212, name:"[豪氷乱撃]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  213:{id:213, name:"[雷電撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  214:{id:214, name:"[猛雷撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  215:{id:215, name:"[豪電撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  216:{id:216, name:"[雷電乱撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  217:{id:217, name:"[猛雷乱撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  218:{id:218, name:"[豪電乱撃]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  219:{id:219, name:"[疾風撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  220:{id:220, name:"[猛風撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  221:{id:221, name:"[豪風撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  222:{id:222, name:"[疾風乱撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  223:{id:223, name:"[猛風乱撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  224:{id:224, name:"[豪風乱撃]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  225:{id:225, name:"[至高の魔弾コピー]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  226:{id:226, name:"[フライシュッツ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  227:{id:227, name:"[モーンバレット]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  228:{id:228, name:"[精密射撃]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  229:{id:229, name:"[ウィークショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  230:{id:230, name:"[グレイトフルワン]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  231:{id:231, name:"[掃射]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  232:{id:232, name:"[十字砲火]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  233:{id:233, name:"[デスペラード]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  234:{id:234, name:"[ＢＣ弾]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  235:{id:235, name:"[ランディショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  236:{id:236, name:"[影縫]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  237:{id:237, name:"[ロックバレット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  238:{id:238, name:"[グッナイマム]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  239:{id:239, name:"[フィアーショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  240:{id:240, name:"[ヘッドショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  241:{id:241, name:"[レッグショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  242:{id:242, name:"[急所射撃]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  243:{id:243, name:"[アームショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  244:{id:244, name:"[アースライトレイ]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  245:{id:245, name:"[ムーンライトレイ]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  246:{id:246, name:"[猫パンチショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  247:{id:247, name:"[ソウルスキャナー]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  248:{id:248, name:"[仲間呼び]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  251:{id:251, name:"[ゲヘナ]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  252:{id:252, name:"[巨角の連撃]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  253:{id:253, name:"[幻虚夢]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  254:{id:254, name:"[秩序の光]", cost:-1, element:elementJSON[7], attackGroup:attackGroup[2]},
  255:{id:255, name:"[暴飲暴食]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  256:{id:256, name:"[食材調達]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  257:{id:257, name:"[エアダイブ]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  258:{id:258, name:"[丸かじり]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  259:{id:259, name:"[アスラローガ]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  260:{id:260, name:"[阿修羅]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  261:{id:261, name:"[極炎の闇]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  262:{id:262, name:"[災厄の輪廻]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  263:{id:263, name:"[豪雷]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  264:{id:264, name:"[シックウェイブ]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  265:{id:265, name:"[シングルショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  266:{id:266, name:"[ヘッドショット]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  267:{id:267, name:"[掃射]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  268:{id:268, name:"[母なる大地]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  269:{id:269, name:"[ピュアブルー]", cost:-1, element:elementJSON[11], attackGroup:attackGroup[2]},
  270:{id:270, name:"[黄昏の旋律]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  271:{id:271, name:"[幻影の秘儀]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  272:{id:272, name:"[極めし魔渦]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  273:{id:273, name:"[荒れ狂う暴乱]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  274:{id:274, name:"[ラビリンス]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  275:{id:275, name:"[巨斧の連撃]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  276:{id:276, name:"[クレオフィスの夢]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  277:{id:277, name:"[離別の光]", cost:-1, element:elementJSON[8], attackGroup:attackGroup[2]},
  278:{id:278, name:"[悪夢の晩餐]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  279:{id:279, name:"[食材調達]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  280:{id:280, name:"[エアダイブ]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  281:{id:281, name:"[丸かじり]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  282:{id:282, name:"[アスラローガ]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  283:{id:283, name:"[阿修羅]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  284:{id:284, name:"[極炎の闇]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  285:{id:285, name:"[天上打]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  286:{id:286, name:"[五月雨撃ち]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  287:{id:287, name:"[克己]", cost:-1, element:elementJSON[11], attackGroup:attackGroup[2]},
  288:{id:288, name:"[汚れ無き風]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  289:{id:289, name:"[大いなる嘆願]", cost:-1, element:elementJSON[10], attackGroup:attackGroup[0]},
  290:{id:290, name:"[ジャッジメント]", cost:-1, element:elementJSON[7], attackGroup:attackGroup[2]},
  291:{id:291, name:"[メル・ファイズ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  292:{id:292, name:"[咎歌]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  293:{id:293, name:"[メギトの雷火]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  294:{id:294, name:"[ライトハンド]", cost:-1, element:elementJSON[11], attackGroup:attackGroup[2]},
  295:{id:295, name:"[天恵の矢]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  296:{id:296, name:"[レクイエム]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  297:{id:297, name:"[地獄の業火]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  298:{id:298, name:"[レフトハンド]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  299:{id:299, name:"[ケイオスタック]", cost:-1, element:elementJSON[2], attackGroup:attackGroup[2]},
  300:{id:300, name:"[混沌の悪夢]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  301:{id:301, name:"[ＭＡ]", cost:-1, element:elementJSON[0], attackGroup:attackGroup[2]},
  302:{id:302, name:"[始祖の理]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  303:{id:303, name:"[大洪水]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  304:{id:304, name:"[キス・マー]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  305:{id:305, name:"[メム＝アレフ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  306:{id:306, name:"[メム＝アレフ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  307:{id:307, name:"[メム＝アレフ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  308:{id:308, name:"[断末波]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  309:{id:309, name:"[アスラローガ]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  310:{id:310, name:"[Ｅ．Ｎ．Ｄ．]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  311:{id:311, name:"[陰業]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  312:{id:312, name:"[当意即妙]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  313:{id:313, name:"[アギゲイト]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  314:{id:314, name:"[ブフゲイト]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  315:{id:315, name:"[ジオゲイト]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  316:{id:316, name:"[ガルゲイト]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  317:{id:317, name:"[ダークマター]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  318:{id:318, name:"[シャッフラー]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  319:{id:319, name:"[火]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  320:{id:320, name:"[氷]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  321:{id:321, name:"[雷]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  322:{id:322, name:"[風]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  323:{id:323, name:"[光]", cost:-1, element:elementJSON[7], attackGroup:attackGroup[2]},
  324:{id:324, name:"[闇]", cost:-1, element:elementJSON[8], attackGroup:attackGroup[2]},
  325:{id:325, name:"[メギドの雷火]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  326:{id:326, name:"[咎歌]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  327:{id:327, name:"[アギゲイト]", cost:-1, element:elementJSON[3], attackGroup:attackGroup[2]},
  328:{id:328, name:"[ブフゲイト]", cost:-1, element:elementJSON[4], attackGroup:attackGroup[2]},
  329:{id:329, name:"[ジオゲイト]", cost:-1, element:elementJSON[5], attackGroup:attackGroup[2]},
  330:{id:330, name:"[ガルゲイト]", cost:-1, element:elementJSON[6], attackGroup:attackGroup[2]},
  331:{id:331, name:"[キス・マー]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  332:{id:332, name:"[ジハード]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  333:{id:333, name:"[ディアラマ]", cost:-1, element:elementJSON[11], attackGroup:attackGroup[2]},
  334:{id:334, name:"[天上打]", cost:-1, element:elementJSON[1], attackGroup:attackGroup[1]},
  335:{id:335, name:"[マハムドオン]", cost:-1, element:elementJSON[8], attackGroup:attackGroup[2]},
  336:{id:336, name:"[マハンマオン]", cost:-1, element:elementJSON[7], attackGroup:attackGroup[2]},
  337:{id:337, name:"[災厄の輪廻]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[2]},
  338:{id:338, name:"[ビッグバン]", cost:-1, element:elementJSON[9], attackGroup:attackGroup[0]},
  339:{id:339, name:"[ラスタキャンディ]", cost:-1, element:elementJSON[12], attackGroup:attackGroup[0]},
  340:{id:340, name:"てっけんせいさい", cost:175543, element:elementJSON[1], attackGroup:attackGroup[1]},
  341:{id:341, name:"うちまくり", cost:175543, element:elementJSON[9], attackGroup:attackGroup[1]},
  342:{id:342, name:"といき", cost:175543, element:elementJSON[4], attackGroup:attackGroup[2]},
  351:{id:351, name:"物理耐性", cost:952, element:elementJSON[13], attackGroup:attackGroup[0]},
  352:{id:352, name:"物理無効", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  353:{id:353, name:"物理反射", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  354:{id:354, name:"物理吸収", cost:87772, element:elementJSON[13], attackGroup:attackGroup[0]},
  355:{id:355, name:"銃耐性", cost:952, element:elementJSON[13], attackGroup:attackGroup[0]},
  356:{id:356, name:"銃無効", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  357:{id:357, name:"銃反射", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  358:{id:358, name:"銃吸収", cost:87772, element:elementJSON[13], attackGroup:attackGroup[0]},
  359:{id:359, name:"火炎耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  360:{id:360, name:"火炎無効", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  361:{id:361, name:"火炎反射", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  362:{id:362, name:"火炎吸収", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  363:{id:363, name:"氷結耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  364:{id:364, name:"氷結無効", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  365:{id:365, name:"氷結反射", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  366:{id:366, name:"氷結吸収", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  367:{id:367, name:"電撃耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  368:{id:368, name:"電撃無効", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  369:{id:369, name:"電撃反射", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  370:{id:370, name:"電撃吸収", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  371:{id:371, name:"疾風耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  372:{id:372, name:"疾風無効", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  373:{id:373, name:"疾風反射", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  374:{id:374, name:"疾風吸収", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  375:{id:375, name:"呪殺耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  376:{id:376, name:"呪殺無効", cost:3020, element:elementJSON[13], attackGroup:attackGroup[0]},
  377:{id:377, name:"破魔耐性", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  378:{id:378, name:"破魔無効", cost:3020, element:elementJSON[13], attackGroup:attackGroup[0]},
  379:{id:379, name:"精神異常無効", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  380:{id:380, name:"身体異常無効", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  381:{id:381, name:"火炎ブースタ", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  382:{id:382, name:"火炎ハイブースタ", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  383:{id:383, name:"氷結ブースタ", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  384:{id:384, name:"氷結ハイブースタ", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  385:{id:385, name:"電撃ブースタ", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  386:{id:386, name:"電撃ハイブースタ", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  387:{id:387, name:"疾風ブースタ", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  388:{id:388, name:"疾風ハイブースタ", cost:10972, element:elementJSON[13], attackGroup:attackGroup[0]},
  389:{id:389, name:"食いしばり", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  390:{id:390, name:"不屈の闘志", cost:87772, element:elementJSON[13], attackGroup:attackGroup[0]},
  391:{id:391, name:"反撃", cost:564, element:elementJSON[13], attackGroup:attackGroup[0]},
  392:{id:392, name:"猛反撃", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  393:{id:393, name:"勝利の息吹", cost:3020, element:elementJSON[13], attackGroup:attackGroup[0]},
  394:{id:394, name:"勝利のチャクラ", cost:43886, element:elementJSON[13], attackGroup:attackGroup[0]},
  395:{id:395, name:"勝利の雄叫び", cost:175543, element:elementJSON[13], attackGroup:attackGroup[0]},
  396:{id:396, name:"生命の泉", cost:155, element:elementJSON[13], attackGroup:attackGroup[0]},
  397:{id:397, name:"チャクラウォーク", cost:3020, element:elementJSON[13], attackGroup:attackGroup[0]},
  398:{id:398, name:"見覚えの成長", cost:222, element:elementJSON[13], attackGroup:attackGroup[0]},
  399:{id:399, name:"見覚えの大成長", cost:952, element:elementJSON[13], attackGroup:attackGroup[0]},
  400:{id:400, name:"アボイドスリーパ", cost:3020, element:elementJSON[13], attackGroup:attackGroup[0]},
  401:{id:401, name:"ラプラスの魔", cost:1666, element:elementJSON[13], attackGroup:attackGroup[0]},
  402:{id:402, name:"追撃の心得", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  403:{id:403, name:"銃ハイブースタ", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  405:{id:405, name:"[自動回復]", cost:-1, element:elementJSON[13], attackGroup:attackGroup[0]},
  406:{id:406, name:"[自動ダメージ]", cost:-1, element:elementJSON[13], attackGroup:attackGroup[0]},
  407:{id:407, name:"[永久の咎罰]", cost:-1, element:elementJSON[13], attackGroup:attackGroup[0]},
  408:{id:408, name:"[不負の法]", cost:-1, element:elementJSON[13], attackGroup:attackGroup[0]},
  409:{id:409, name:"物理ブースタ", cost:952, element:elementJSON[13], attackGroup:attackGroup[0]},
  410:{id:410, name:"物理ハイブースタ", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  411:{id:411, name:"銃ブースタ", cost:952, element:elementJSON[13], attackGroup:attackGroup[0]},
  412:{id:412, name:"回復ブースタ", cost:347, element:elementJSON[13], attackGroup:attackGroup[0]},
  413:{id:413, name:"回復ハイブースタ", cost:5663, element:elementJSON[13], attackGroup:attackGroup[0]},
  414:{id:414, name:"一分の活泉", cost:222, element:elementJSON[13], attackGroup:attackGroup[0]},
  415:{id:415, name:"二分の活泉", cost:1666, element:elementJSON[13], attackGroup:attackGroup[0]},
  416:{id:416, name:"三分の活泉", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]},
  417:{id:417, name:"一分の魔脈", cost:222, element:elementJSON[13], attackGroup:attackGroup[0]},
  418:{id:418, name:"二分の魔脈", cost:1666, element:elementJSON[13], attackGroup:attackGroup[0]},
  419:{id:419, name:"三分の魔脈", cost:21943, element:elementJSON[13], attackGroup:attackGroup[0]}
});
// }}}

// スキル
var skillMap = new Array();
for (var i in skillJSON) {
  skillMap[i] = new Skill(skillJSON[i]);
}
;

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
// 悪魔
var devilMap = createDevilMap(devilJSON);

var indexMap = new Array();
// {{{
indexMap[0] = [21, 19, 9, 15, 17, 12, 10, 2, 13, 11, 16, 18, 7, 8, 20, 6, 1, 3, 4, 14, 5, 0];
indexMap[2] = [20, 15, 17, 5, 10, 13, 18, 8, 4, 6, 3, 14, 12, 21, 7, 16, 19, 2, 9, 0, 11, 1];
indexMap[6] = [5, 17, 12, 9, 21, 13, 19, 3, 14, 10, 1, 8, 7, 20, 2, 11, 18, 16, 6, 15, 4, 0];
indexMap[11] = [13, 16, 11, 6, 7, 19, 2, 20, 14, 8, 10, 5, 9, 1, 0, 18, 21, 4, 15, 12, 3, 17];
indexMap[16] = [20, 14, 16, 13, 21, 17, 0, 9, 10, 4, 7, 2, 19, 12, 3, 18, 15, 5, 1, 6, 11, 8];
indexMap[17] = [20, 5, 17, 21, 11, 16, 9, 14, 13, 7, 0, 3, 15, 18, 2, 6, 8, 4, 19, 12, 10, 1];
indexMap[28] = [21, 20, 15, 17, 16, 18, 12, 19, 14, 13, 8, 10, 9, 0, 1, 5, 7, 11, 2, 6, 3, 4];
indexMap[29] = [12, 19, 16, 9, 20, 15, 10, 21, 1, 17, 5, 14, 7, 8, 6, 4, 18, 13, 3, 11, 2, 0];
indexMap[32] = [19, 14, 12, 17, 20, 9, 10, 5, 21, 13, 0, 6, 3, 2, 1, 18, 15, 8, 7, 4, 11, 16];
indexMap[36] = [16, 7, 9, 18, 17, 13, 15, 8, 19, 10, 11, 20, 6, 14, 2, 21, 3, 0, 5, 12, 1, 4];
indexMap[37] = [13, 19, 3, 17, 11, 16, 15, 1, 8, 9, 18, 10, 20, 7, 5, 6, 21, 2, 12, 0, 4, 14];
indexMap[48] = [20, 8, 18, 7, 13, 15, 17, 12, 16, 10, 14, 4, 9, 21, 2, 5, 3, 11, 0, 1, 19, 6];
indexMap[53] = [18, 20, 11, 17, 15, 16, 9, 1, 13, 7, 12, 5, 21, 3, 19, 10, 4, 6, 8, 14, 0, 2];
indexMap[55] = [15, 16, 12, 13, 0, 20, 21, 10, 6, 5, 11, 19, 2, 8, 9, 4, 14, 18, 17, 7, 3, 1];
indexMap[57] = [15, 21, 18, 14, 16, 10, 19, 20, 17, 13, 11, 8, 9, 5, 7, 3, 4, 12, 0, 2, 1, 6];
indexMap[58] = [15, 18, 14, 12, 16, 8, 20, 13, 5, 4, 21, 3, 2, 10, 17, 11, 19, 6, 1, 9, 0, 7];
indexMap[59] = [15, 13, 16, 12, 19, 14, 21, 9, 10, 17, 3, 6, 7, 2, 4, 5, 20, 18, 8, 1, 0, 11];
indexMap[66] = [15, 14, 17, 19, 11, 16, 20, 13, 21, 8, 10, 18, 9, 5, 3, 1, 12, 7, 4, 0, 6, 2];
indexMap[77] = [20, 3, 19, 16, 15, 18, 10, 14, 13, 12, 11, 7, 9, 6, 17, 1, 2, 5, 21, 4, 0, 8];
indexMap[79] = [14, 13, 8, 19, 11, 1, 3, 10, 2, 0, 4, 18, 16, 20, 7, 5, 6, 12, 17, 21, 15, 9];
indexMap[81] = [10, 13, 17, 9, 21, 12, 5, 8, 16, 11, 20, 19, 18, 4, 3, 2, 15, 1, 6, 0, 14, 7];
indexMap[86] = [19, 20, 11, 17, 21, 18, 5, 14, 4, 7, 16, 8, 9, 12, 15, 0, 3, 13, 2, 10, 1, 6];
indexMap[87] = [14, 13, 17, 11, 10, 20, 9, 6, 12, 7, 2, 19, 1, 15, 4, 21, 5, 16, 18, 3, 0, 8];
indexMap[88] = [21, 20, 13, 16, 11, 6, 10, 14, 12, 15, 4, 19, 9, 8, 7, 18, 2, 3, 17, 5, 1, 0];
indexMap[91] = [15, 6, 10, 18, 17, 21, 14, 20, 9, 12, 3, 16, 13, 4, 8, 5, 19, 1, 2, 7, 11, 0];
indexMap[97] = [20, 11, 18, 17, 15, 8, 13, 9, 12, 14, 10, 19, 21, 6, 2, 3, 0, 16, 5, 4, 1, 7];
indexMap[98] = [14, 3, 13, 17, 15, 7, 12, 21, 5, 19, 16, 1, 10, 8, 11, 2, 18, 0, 20, 6, 4, 9];
indexMap[100] = [17, 14, 18, 13, 12, 15, 5, 8, 21, 9, 10, 2, 19, 7, 20, 3, 11, 16, 0, 4, 6, 1];
indexMap[105] = [10, 13, 17, 16, 9, 18, 14, 3, 12, 2, 15, 19, 20, 1, 8, 4, 0, 5, 11, 21, 6, 7];
indexMap[116] = [14, 13, 19, 1, 9, 16, 5, 11, 4, 18, 21, 10, 7, 6, 2, 15, 8, 20, 3, 17, 12, 0];
indexMap[118] = [18, 13, 15, 20, 21, 10, 9, 8, 17, 12, 11, 19, 1, 4, 5, 7, 3, 14, 2, 0, 16, 6];
indexMap[123] = [15, 4, 16, 11, 17, 20, 6, 8, 3, 10, 18, 12, 13, 0, 9, 21, 5, 19, 2, 7, 1, 14];
indexMap[132] = [17, 14, 5, 18, 21, 8, 11, 20, 19, 6, 15, 13, 4, 10, 1, 0, 16, 12, 3, 2, 9, 7];
indexMap[133] = [17, 13, 20, 16, 3, 18, 15, 10, 19, 12, 11, 14, 21, 9, 7, 1, 5, 4, 8, 6, 2, 0];
indexMap[136] = [17, 14, 3, 15, 6, 0, 18, 5, 7, 12, 1, 4, 19, 2, 20, 21, 13, 16, 9, 8, 10, 11];
indexMap[138] = [19, 6, 18, 14, 21, 16, 1, 15, 3, 10, 11, 13, 12, 0, 7, 17, 9, 4, 8, 2, 20, 5];
indexMap[140] = [20, 18, 19, 14, 17, 6, 15, 9, 10, 2, 7, 4, 21, 13, 1, 5, 16, 12, 0, 8, 11, 3];
indexMap[144] = [19, 3, 18, 13, 17, 14, 5, 12, 16, 9, 0, 10, 4, 11, 1, 6, 2, 20, 21, 7, 8, 15];
indexMap[151] = [11, 18, 21, 8, 19, 20, 16, 4, 10, 3, 9, 0, 14, 17, 5, 13, 1, 15, 6, 7, 12, 2];
indexMap[152] = [17, 16, 15, 18, 21, 11, 19, 14, 20, 12, 13, 7, 9, 8, 10, 6, 3, 5, 4, 1, 2, 0];
indexMap[160] = [20, 21, 17, 7, 12, 13, 11, 8, 16, 10, 14, 6, 4, 19, 5, 15, 9, 0, 2, 1, 18, 3];
indexMap[162] = [9, 21, 19, 17, 15, 11, 10, 4, 2, 3, 8, 20, 16, 5, 1, 13, 18, 0, 12, 14, 6, 7];
indexMap[163] = [18, 7, 14, 9, 2, 17, 20, 13, 16, 21, 19, 6, 5, 10, 4, 1, 12, 15, 0, 11, 3, 8];
indexMap[164] = [21, 13, 19, 4, 17, 16, 14, 12, 11, 20, 15, 18, 5, 0, 6, 2, 1, 10, 3, 9, 7, 8];
indexMap[166] = [21, 5, 19, 9, 18, 14, 8, 16, 17, 11, 2, 20, 13, 12, 0, 15, 10, 3, 1, 7, 4, 6];
indexMap[169] = [18, 16, 10, 6, 15, 11, 21, 14, 12, 20, 17, 2, 5, 4, 13, 7, 0, 1, 19, 8, 9, 3];
indexMap[170] = [13, 15, 19, 8, 1, 16, 11, 21, 12, 7, 14, 3, 5, 18, 20, 10, 4, 2, 0, 6, 17, 9];
indexMap[172] = [20, 17, 11, 10, 16, 18, 14, 9, 2, 15, 21, 19, 5, 1, 6, 0, 4, 12, 7, 3, 8, 13];
indexMap[175] = [19, 12, 18, 5, 17, 21, 3, 7, 10, 16, 1, 13, 9, 8, 15, 6, 20, 4, 0, 2, 11, 14];
indexMap[176] = [13, 10, 19, 20, 17, 16, 15, 14, 21, 4, 6, 8, 7, 18, 11, 5, 9, 1, 2, 12, 3, 0];
indexMap[179] = [19, 16, 7, 14, 17, 21, 18, 9, 4, 12, 6, 3, 13, 5, 20, 8, 11, 15, 1, 2, 10, 0];
indexMap[181] = [10, 19, 20, 14, 16, 17, 4, 0, 5, 7, 2, 12, 8, 9, 13, 15, 21, 3, 6, 11, 1, 18];
indexMap[183] = [21, 14, 18, 17, 16, 19, 0, 9, 11, 10, 12, 13, 8, 5, 4, 15, 20, 1, 3, 6, 7, 2];
indexMap[184] = [21, 17, 15, 9, 20, 10, 11, 14, 13, 19, 16, 12, 7, 8, 1, 18, 2, 4, 3, 0, 6, 5];
indexMap[186] = [15, 18, 5, 16, 14, 19, 7, 10, 6, 1, 0, 8, 9, 17, 21, 3, 20, 4, 11, 2, 12, 13];
indexMap[196] = [16, 13, 21, 9, 8, 19, 7, 12, 14, 17, 10, 11, 20, 5, 2, 3, 18, 6, 15, 1, 0, 4];
indexMap[201] = [18, 15, 19, 14, 20, 5, 10, 17, 1, 21, 12, 7, 2, 3, 6, 11, 9, 8, 13, 0, 16, 4];
indexMap[209] = [14, 19, 21, 10, 17, 15, 9, 4, 20, 18, 3, 13, 6, 5, 8, 12, 1, 16, 7, 11, 0, 2];
indexMap[211] = [19, 21, 9, 16, 13, 20, 15, 11, 17, 12, 14, 1, 18, 7, 10, 4, 5, 8, 0, 3, 6, 2];
indexMap[215] = [15, 5, 7, 12, 1, 8, 20, 13, 4, 11, 16, 9, 2, 19, 18, 17, 21, 10, 6, 14, 0, 3];
indexMap[217] = [13, 20, 7, 9, 18, 17, 16, 14, 15, 11, 5, 12, 8, 3, 1, 6, 19, 2, 21, 0, 4, 10];
indexMap[219] = [10, 8, 15, 18, 20, 13, 12, 2, 0, 11, 7, 17, 5, 6, 21, 19, 4, 14, 9, 1, 3, 16];
indexMap[221] = [16, 21, 18, 12, 17, 1, 11, 9, 15, 8, 14, 4, 20, 7, 5, 13, 2, 0, 19, 10, 6, 3];
indexMap[225] = [12, 21, 16, 19, 7, 8, 0, 2, 4, 11, 6, 1, 17, 20, 3, 18, 10, 5, 14, 15, 9, 13];
indexMap[227] = [13, 18, 6, 11, 9, 10, 3, 14, 21, 12, 7, 16, 17, 8, 1, 20, 15, 2, 0, 4, 19, 5];
indexMap[229] = [13, 8, 2, 10, 16, 17, 3, 5, 11, 12, 19, 20, 21, 9, 1, 4, 6, 15, 0, 18, 14, 7];
indexMap[236] = [21, 15, 17, 18, 16, 6, 11, 12, 13, 8, 19, 20, 14, 7, 4, 5, 10, 3, 1, 9, 0, 2];
indexMap[240] = [11, 17, 13, 7, 16, 15, 19, 21, 14, 6, 18, 3, 5, 12, 20, 2, 4, 10, 0, 1, 9, 8];
indexMap[243] = [20, 21, 18, 15, 16, 13, 7, 17, 14, 12, 11, 5, 4, 6, 2, 9, 10, 3, 8, 19, 1, 0];
indexMap[244] = [15, 21, 10, 18, 12, 17, 16, 6, 14, 19, 11, 20, 4, 9, 1, 13, 0, 2, 7, 3, 8, 5];
indexMap[245] = [14, 17, 12, 9, 19, 15, 13, 20, 5, 21, 11, 6, 18, 7, 8, 16, 3, 4, 10, 1, 2, 0];
indexMap[252] = [16, 14, 8, 0, 19, 12, 20, 13, 21, 5, 9, 7, 3, 15, 2, 4, 17, 1, 6, 11, 18, 10];
indexMap[254] = [21, 19, 17, 12, 18, 5, 15, 9, 7, 8, 4, 16, 14, 1, 13, 6, 2, 11, 3, 0, 20, 10];
//}}}

var charMap = "し,ん,い,く,み,Ｂ,や,る,Ｙ,け,ひ,Ｋ,Ｆ,と,Ｈ,む,Ａ,ち,に,Ｚ,き,Ｗ,よ,Ｌ,を,の,た,れ,Ｎ,え,Ｓ,ふ,わ,Ｊ,そ,り,す,Ｃ,め,Ｐ,へ,Ｑ,Ｇ,Ｒ,Ｄ,こ,Ｍ,Ｔ,ま,つ,せ,か,は,Ｅ,Ｕ,て,さ,な,あ,も,ゆ,お,う,ろ".split(",");

var letters = "しんいくみＢやるＹけひＫＦとＨむＡちにＺきＷよＬをのたれＮえＳふわＪそりすＣめＰへＱＧＲＤこＭＴまつせかはＥＵてさなあもゆおうろ";

var currentPatternID = null;

function setPattern(patternID) {
  currentPatternID = patternID;
}

var expTable = {
  "0":4, //{{{
  "1":12,
  "2":27,
  "3":57,
  "4":106,
  "5":178,
  "6":280,
  "7":415,
  "8":589,
  "9":806,
  "10":1070,
  "11":1388,
  "12":1763,
  "13":2201,
  "14":2706,
  "15":3282,
  "16":3936,
  "17":4671,
  "18":5493,
  "19":6406,
  "20":7414,
  "21":8524,
  "22":9739,
  "23":11065,
  "24":12506,
  "25":14066,
  "26":15752,
  "27":17567,
  "28":19517,
  "29":21606,
  "30":23838,
  "31":26220,
  "32":28755,
  "33":31449,
  "34":34306,
  "35":37330,
  "36":40528,
  "37":43903,
  "38":47461,
  "39":51206,
  "40":55142,
  "41":59276,
  "42":63611,
  "43":68153,
  "44":72906,
  "45":77874,
  "46":83064,
  "47":88479,
  "48":94125,
  "49":100006,
  "50":106126,
  "51":112492,
  "52":119107,
  "53":125977,
  "54":133106,
  "55":136802,
  "56":140633,
  "57":144601,
  "58":148708,
  "59":152957,
  "60":157349,
  "61":161888,
  "62":166576,
  "63":168996,
  "64":171492,
  "65":174066,
  "66":176720,
  "67":179454,
  "68":182270,
  "69":185168,
  "70":188129,
  "71":191132,
  "72":194178,
  "73":197267,
  "74":200399,
  "75":203575,
  "76":206795,
  "77":210059,
  "78":213367,
  "79":216720,
  "80":220118,
  "81":223561,
  "82":227050,
  "83":230585,
  "84":234166,
  "85":237793,
  "86":241467,
  "87":245188,
  "88":248956,
  "89":252773,
  "90":256637,
  "91":260549,
  "92":264510,
  "93":268520,
  "94":272579,
  "95":276688,
  "96":280847,
  "97":285056,
  "98":289315,
  "99":0//}}}
}
var expBaseScaleFactor = [
  1 , 1.2 , 1.44 , 1.72 , 1.94 , 2.18 , 2.46 , 2.78 , 3.14 , 3.54 , 4
];

// 準備 OK フラグ
var isReady = false;


// -------------------------------------------------------------------------------------------------
// 処理
// -------------------------------------------------------------------------------------------------
// 初期化処理
function init() {
  //{{{
  $('#output-area').val("初期化中 ...");

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

  createSkillFilterList();

  // 経験値フィールド初期化
  $('#exp').val(0);

  createSkills();

  // 悪魔リスト初期化
  createDevils();

  $('#output-area').val("初期化完了。");
  isReady = true;
}//}}}

/**
 * スキルフィルタリスト生成
 */
function createSkillFilterList() {
  $('#skill-filter').append("<option value='none'>フィルタリング無し</option>");
  for (var i in elementJSON) {
    var option = '<option value="element-'+ elementJSON[i].id+'">'+ elementJSON[i].name +'</option>';
    $('#skill-filter').append(option);
  };
}

/**
 * 敵専用チェックボックスを変更した際に呼ぶ関数です。
 * 悪魔リストとスキルリストに敵専用のモノを追加や除去します。
 */
function changeEnemyExclusive() {
  createDevils();
  createSkills();
}

/**
 *
 */
function createDevilOption(devil) {
  var result = '<option class="genus-'+ devil.genusID +'" ' +
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
  $('#devilID').empty();
  var isEnemyExclusive = $('#enemy-exclusive').checked();
  for (i in devilMap) {
    var devil = devilMap[i];
    if (devil.playerUses) {
      $('#devilID').append(createDevilOption(devil));
    } else if (isEnemyExclusive) {
      // 敵専用チェックされていない限り追加しない
      $('#devilID').append(createDevilOption(devil));
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
}//}}}
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
}//}}}

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
}//}}}
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
}//}}}

/**
 * 悪魔の既定ステータスを画面へセットします。
 */
function doSetDefault() {
  // 悪魔 ID の入力値を取得//{{{
  var devilID = $('#devilID').val();

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

  // スキル
  $('#slSkill0').val(devil.skill[0]);
  $('#slSkill1').val(devil.skill[1]);
  $('#slSkill2').val(devil.skill[2]);
  $('#slSkill3').val(devil.skill[3]);
  $('#slSkill4').val(devil.skill[4]);
  $('#slSkill5').val(devil.skill[5]);

  devil.HP = calculateHP(devil.lv, devil.vit, devil.addHP, devil.baseHP, devil.skill);
  devil.MP = calculateMP(devil.lv, devil.int, devil.addMP, devil.baseHP, devil.skill);

  setEXPMax(devil);

  // 悪魔情報を取得して表示
  $('#output-area').val(devil.getSimpleInformation());
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
  var devilID = $('#devilID').val();

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
    $('#output-area').val(devil.getSimpleInformation());
  //}}}
}

/**
 * 能力値基準値を画面へ設定します。
 * @param {Devil} devil データの入った悪魔クラス
 */
function setStatusBase(devil) {
  // 能力値・基準値
  if ($('#cbBaseEqReal').checked()) {
    // 「□実値と同じ値を使う」チェックボックスがチェックされている場合
    devil.strBase = devil.str;
    devil.intBase = devil.int;
    devil.vitBase = devil.vit;
    devil.agiBase = devil.agi;
    devil.lucBase = devil.luc;
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
  $('#exp-max-label').empty();
  $('#exp-max-label').append(devil.expMax);

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
function doInput() {//{{{
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

  $('#output-area').val(msg);
}
//}}}
// 入力されたパスワードを解析する (文字モード)
function analyzeCharPassword(password) {//{{{
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
}//}}}

// 入力されたパスワードを解析する (ビットモード)
function analyzeBitPassword(password) {//{{{
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
}//}}}

// 入力されたパスワードを解析する (共通部)
function analyzePassword(srcOld, msgOld) {//{{{
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
    document.foMain.slDevil.selectedIndex = devilID - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // Lv (1 ～ 99)
  msg += "Lv          = " + lv;
  if (1 <= lv && lv <= 99) {
    document.foMain.slLv.selectedIndex = lv - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 経験値 (0 ～ 2097151)
  msg += "経験値      = " + exp;
  if (0 <= exp && exp <= 2097151) {
    document.foMain.txExp.value = exp;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (実値) (1 ～ 99)
  msg += "力 (実値)   = " + str;
  if (1 <= str && str <= 99) {
    document.foMain.slStr.selectedIndex = str - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (実値) (1 ～ 99)
  msg += "魔 (実値)   = " + int;
  if (1 <= int && int <= 99) {
    document.foMain.slInt.selectedIndex = int - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (実値) (1 ～ 99)
  msg += "体 (実値)   = " + vit;
  if (1 <= vit && vit <= 99) {
    document.foMain.slVit.selectedIndex = vit - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (実値) (1 ～ 99)
  msg += "速 (実値)   = " + agi;
  if (1 <= agi && agi <= 99) {
    document.foMain.slAgi.selectedIndex = agi - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (実値) (1 ～ 99)
  msg += "運 (実値)   = " + luc;
  if (1 <= luc && luc <= 99) {
    document.foMain.slLuc.selectedIndex = luc - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (基準値) (1 ～ 99)
  msg += "力 (基準値) = " + strBase;
  if (1 <= strBase && strBase <= 99) {
    document.foMain.slStrBase.selectedIndex = strBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (基準値) (1 ～ 99)
  msg += "魔 (基準値) = " + intBase;
  if (1 <= intBase && intBase <= 99) {
    document.foMain.slIntBase.selectedIndex = intBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (基準値) (1 ～ 99)
  msg += "体 (基準値) = " + vitBase;
  if (1 <= vitBase && vitBase <= 99) {
    document.foMain.slVitBase.selectedIndex = vitBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (基準値) (1 ～ 99)
  msg += "速 (基準値) = " + agiBase;
  if (1 <= agiBase && agiBase <= 99) {
    document.foMain.slAgiBase.selectedIndex = agiBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (基準値) (1 ～ 99)
  msg += "運 (基準値) = " + lucBase;
  if (1 <= lucBase && lucBase <= 99) {
    document.foMain.slLucBase.selectedIndex = lucBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[1] (0 ～ 419)
  msg += "スキル[1]   = " + skill[0];
  if (0 <= skill[0] && skill[0] <= 419) {
    document.foMain.slSkill0.selectedIndex = skill[0];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[2] (0 ～ 419)
  msg += "スキル[2]   = " + skill[1];
  if (0 <= skill[1] && skill[1] <= 419) {
    document.foMain.slSkill1.selectedIndex = skill[1];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[3] (0 ～ 419)
  msg += "スキル[3]   = " + skill[2];
  if (0 <= skill[2] && skill[2] <= 419) {
    document.foMain.slSkill2.selectedIndex = skill[2];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[4] (0 ～ 419)
  msg += "スキル[4]   = " + skill[3];
  if (0 <= skill[3] && skill[3] <= 419) {
    document.foMain.slSkill3.selectedIndex = skill[3];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[5] (0 ～ 419)
  msg += "スキル[5]   = " + skill[4];
  if (0 <= skill[4] && skill[4] <= 419) {
    document.foMain.slSkill4.selectedIndex = skill[4];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[6] (0 ～ 419)
  msg += "スキル[6]   = " + skill[5];
  if (0 <= skill[5] && skill[5] <= 419) {
    document.foMain.slSkill5.selectedIndex = skill[5];
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
function generatePassword(devil) {//{{{
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
function fillZero(place, value) {//{{{
  var i;
  for (i = value.length; i < place; i++) {
    value = "0" + value;
    if (i < 0) {
      return;
    }
  }

  return value;
}//}}}

// 指定桁数での後方 0 埋め
function fillZeroAfter(place, value) {//{{{
  var i;
  for (i = value.length; i < place; i++) {
    value = value + "0";
  }

  return value;
}//}}}

// 該当する種族を返す
function getGenus(genusID) {//{{{
  return (genusMap[genusID]);
}//}}}

// 該当するスキルを返す
function getSkill(skillID) {//{{{
  return (skillMap[skillID]);
}//}}}

// 該当する悪魔を返す
function getDevil(devilID) {//{{{
  return (devilMap[devilID]);
}//}}}

// 該当する属性耐性を返す
function getAttr(attrID) {//{{{
  return (attrMap[attrID]);
}//}}}

// -------------------------------------------------------------------------------------------------
// 種族クラス
// -------------------------------------------------------------------------------------------------
function Genus(genusID, name, simpleName) {
  //{{{
  // 種族 ID
  this.genusID = genusID;
  // 名称
  this.name = name;
  // 略称
  this.simpleName = simpleName;
  // スタンス
  // TODO this.stance = stance;

  // この種族の文字列表現を返す。(簡易)
  this.toString = function () {
    return this.name;
  }

  // この種族の文字列表現を返す。(詳細)
  this.toDetailString = function () {
    return this.name;
  }
  //}}}
}

// -----------------------------------------------------------------------------
// スキルクラス
// -----------------------------------------------------------------------------
/*
 * スキルクラス
 * @param {Object} skill
 *  id:           id
 *  name:         名前
 *  cost:         スキル付与コスト
 *  elemental     攻撃属性
 *  attackGroup:  威力算出分類 特殊・物理・魔法
 */
function Skill(skill) {
  //{{{
  // スキル ID
  this.skillID = skill.id;
  // 名称
  this.name = skill.name;
  // コスト
  this.cost = skill.cost;
  this.element = skill.element;
  this.attackGroup = skill.attackGroup;

  this.toStringCost = function () {
    return "cost:" + this.cost;
  }
  // この種族の文字列表現を返す。(簡易)
  this.toString = function () {
    return this.name;
  }

  this.info = function () {
    return "" + this.skillID + " : " +
      this.name + " " +
      this.attackGroup.name + " " +
      skill.element.name + "属性" +
      ' cost:' + this.cost;
  }

  // この種族の文字列表現を返す。(詳細)
  this.toDetailString = function () {
    return this.skillID + ":" + this.name;
  }
  //}}}
}

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
  this.attr = devil.attr;
  // スキル(1～6)
  this.skillDefault = this.skill = devil.skillDefault;
  // オリジナルデータへの参照
  this.original = this;
  this.playerUses = devil.playerUses;
  this.totalCost = 0;

  this.expMax = 2097151;

  /**
   * 最大コスト算出します。
   * this.skillが正しく設定されている必要があります。
   */
  this.calculateMaxSkillCost = function () {
    this.maxSkillCost = 0;//{{{
    for (var i = 0, len = this.skill.length; i < len; i++) {
      var skillData = getSkill(this.skill[i]);
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
  }//}}}

  // この悪魔の複製を返す。
  Devil.prototype.clone = function () {
    //{{{
    var clone = new Devil(this);

    clone.attr = this.attr.slice(0);
    clone.skill = this.skill.slice(0);

    clone.original = this;

    return clone;
  }//}}}

  // この悪魔の文字列表現を返す。(簡易)
  this.toString = function () {
    //{{{
    var enemyExclusive = this.playerUses ? "" : "（？）"
    return "" + this.devilID +
      ":[" + getGenus(this.genusID).toString() + "]" +
      this.name + enemyExclusive;
  }//}}}

  // この悪魔の文字列表現を返す。(詳細)
  this.toDetailString = function () {
    //{{{
    return this.toString();
  }//}}}

  // この悪魔の情報を返す。(簡易)
  this.getSimpleInformation = function () {
    //{{{
    var msg = "";

    msg += "【" + this.toString() + "】";
    msg += "\n";

    msg += " COST:" + addComma(this.calculateCost());
    msg += " 100%時:" + addComma(Math.floor(this.calculateCost() / 2));
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
    msg += getAttr(this.attr[0]);
    msg += getAttr(this.attr[1]);
    msg += getAttr(this.attr[2]);
    msg += getAttr(this.attr[3]);
    msg += getAttr(this.attr[4]);
    msg += getAttr(this.attr[5]);
    msg += getAttr(this.attr[6]);
    msg += getAttr(this.attr[7]);
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
  }//}}}

  // この悪魔の情報を返す。(詳細)
  this.getDetailInformation = function () {
    return this.getSimpleInformation();//{{{
  }
  //}}}
  //}}}
}
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
  var filter = $("#skill-filter").val();
  var selecter = "select.skills option";
  $(selecter).removeClass('highlight');
  if (filter != "none") {
    $(selecter).filter("."+filter).addClass('highlight');
  }
};

// event binds
$(function () {
  init();
  // var select = $( "#slStr" );
  // var slider = $( "<div id='"+"'slider'></div>" ).insertAfter( select ).slider({
  //     min: 1,
  //     max: 99,
  //     range: "min",
  //     value: select[ 0 ].selectedIndex + 1,
  //     slide: function( event, ui ) {
  //         select.val(ui.value);
  //         doRefresh();
  //     }
  // });
  var statusElm = $('.status');
  statusElm.each(function (index,val) {
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
      select.on('change',function () {
        var id = $(this).attr('id');
        var slider = $('#' +id+'-slider');
        var val = $(this).val();
        slider.slider({'value':val});
      })
  })

  $('div.left-indent select').on('change' ,function () {
    doRefresh();
  });
  $('#cbBaseEqReal').change(function () {
    doRefresh();
  });
  $('#exp').change(function () {
    doRefresh();
  });
  $('#password-pattern').change(function () {
    doRefresh();
  });

  $('#enemy-exclusive').change(function () {
    changeEnemyExclusive();
  });

  $('#set-default').click(function () {
    doSetDefault()
  });

  $('#password-parse').click(function () {
    doInput();
  });

  $('#skill-filter').on('change',function(){
    skillFiltering()
  });

  $('label[for="slStr"]').on("dblclick", function () {
    toggleStatusMaxMin($('#slStr'));
  });
  $('label[for="slInt"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slInt'));
  });
  $('label[for="slVit"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slVit'));
  });
  $('label[for="slAgi"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slAgi'));
  });
  $('label[for="slLuc"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slLuc'));
  });
  $('label[for="slStrBase"]').on("dblclick", function () {
    toggleStatusMaxMin($('#slStrBase'));
  });
  $('label[for="slIntBase"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slIntBase'));
  });
  $('label[for="slVitBase"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slVitBase'));
  });
  $('label[for="slAgiBase"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slAgiBase'));
  });
  $('label[for="slLucBase"]').on('dblclick', function () {
    toggleStatusMaxMin($('#slLucBase'));
  });


  // $( "#slStr" ).change(function() {
  //     slider.slider( "value", this.selectedIndex + 1 );
  // });
});
