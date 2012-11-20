////////////////////////////////////////////////////////////////////////////////////////////////////
// 真・女神転生 ストレンジ ジャーニー 悪魔召還プログラム ver 1.1/02 mod
// (c) http://www20.atwiki.jp/strange_journey/
////////////////////////////////////////////////////////////////////////////////////////////////////

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

// スキル
var skillMap = new Array();
//{{{
skillMap["0"] = new Skill(0,"－",0)
skillMap["1"] = new Skill(1,"アギ",112)
skillMap["2"] = new Skill(2,"アギラオ",347)
skillMap["3"] = new Skill(3,"アギダイン",3020)
skillMap["4"] = new Skill(4,"マハラギ",155)
skillMap["5"] = new Skill(5,"マハラギオン",952)
skillMap["6"] = new Skill(6,"マハラギダイン",10972)
skillMap["7"] = new Skill(7,"ファイアブレス",347)
skillMap["8"] = new Skill(8,"トリスアギオン",21943)
skillMap["9"] = new Skill(9,"ラグナロク",87772)
skillMap["10"] = new Skill(10,"ブフ",112)
skillMap["11"] = new Skill(11,"ブフーラ",347)
skillMap["12"] = new Skill(12,"ブフダイン",3020)
skillMap["13"] = new Skill(13,"マハブフ",155)
skillMap["14"] = new Skill(14,"マハブフーラ",952)
skillMap["15"] = new Skill(15,"マハブフダイン",10972)
skillMap["16"] = new Skill(16,"アイスブレス",347)
skillMap["17"] = new Skill(17,"絶対零度",21943)
skillMap["18"] = new Skill(18,"大冷界",87772)
skillMap["19"] = new Skill(19,"ジオ",112)
skillMap["20"] = new Skill(20,"ジオンガ",347)
skillMap["21"] = new Skill(21,"ジオダイン",3020)
skillMap["22"] = new Skill(22,"マハジオ",155)
skillMap["23"] = new Skill(23,"マハジオンガ",952)
skillMap["24"] = new Skill(24,"マハジオダイン",10972)
skillMap["25"] = new Skill(25,"放電",347)
skillMap["26"] = new Skill(26,"真理の雷",21943)
skillMap["27"] = new Skill(27,"魅惑の雷撃",87772)
skillMap["28"] = new Skill(28,"ガル",112)
skillMap["29"] = new Skill(29,"ガルーラ",347)
skillMap["30"] = new Skill(30,"ガルダイン",3020)
skillMap["31"] = new Skill(31,"マハガル",155)
skillMap["32"] = new Skill(32,"マハガルーラ",952)
skillMap["33"] = new Skill(33,"マハガルダイン",10972)
skillMap["34"] = new Skill(34,"ウインドブレス",347)
skillMap["35"] = new Skill(35,"殺風激",21943)
skillMap["36"] = new Skill(36,"妖花烈風",87772)
skillMap["37"] = new Skill(37,"メギド",952)
skillMap["38"] = new Skill(38,"メギドラ",10972)
skillMap["39"] = new Skill(39,"メギドラオン",43886)
skillMap["40"] = new Skill(40,"ビッグバン",87772)
skillMap["41"] = new Skill(41,"ジハード",175543)
skillMap["42"] = new Skill(42,"バビロンの杯",175543)
skillMap["43"] = new Skill(43,"天罰",3020)
skillMap["44"] = new Skill(44,"ジャッジメント",3020)
skillMap["45"] = new Skill(45,"混沌の海",3020)
skillMap["46"] = new Skill(46,"特攻",1666)
skillMap["47"] = new Skill(47,"自爆",5663)
skillMap["48"] = new Skill(48,"吸血",564)
skillMap["49"] = new Skill(49,"吸魔",1666)
skillMap["50"] = new Skill(50,"エナジードレイン",21943)
skillMap["51"] = new Skill(51,"運命の角笛",1666)
skillMap["52"] = new Skill(52,"永眠への誘い",10972)
skillMap["53"] = new Skill(53,"ムド",155)
skillMap["54"] = new Skill(54,"ムドオン",347)
skillMap["55"] = new Skill(55,"マハムド",952)
skillMap["56"] = new Skill(56,"マハムドオン",3020)
skillMap["57"] = new Skill(57,"死んでくれる？",21943)
skillMap["58"] = new Skill(58,"ハマ",155)
skillMap["59"] = new Skill(59,"ハマオン",347)
skillMap["60"] = new Skill(60,"マハンマ",952)
skillMap["61"] = new Skill(61,"マハンマオン",3020)
skillMap["62"] = new Skill(62,"審判の光",21943)
skillMap["63"] = new Skill(63,"ドルミナー",112)
skillMap["64"] = new Skill(64,"子守唄",564)
skillMap["65"] = new Skill(65,"ポイズマ",112)
skillMap["66"] = new Skill(66,"毒ガスブレス",564)
skillMap["67"] = new Skill(67,"シバブー",155)
skillMap["68"] = new Skill(68,"バインドボイス",952)
skillMap["69"] = new Skill(69,"マリンカリン",155)
skillMap["70"] = new Skill(70,"ファイナルヌード",952)
skillMap["71"] = new Skill(71,"石化の呪い",222)
skillMap["72"] = new Skill(72,"石化ブレス",1666)
skillMap["73"] = new Skill(73,"ポパスマ",112)
skillMap["74"] = new Skill(74,"戦慄の眼光",564)
skillMap["75"] = new Skill(75,"マカジャマ",112)
skillMap["76"] = new Skill(76,"トリッキーダンス",564)
skillMap["77"] = new Skill(77,"[ダウノマ]",-1)
skillMap["78"] = new Skill(78,"[渇きの海]",-1)
skillMap["79"] = new Skill(79,"[バイツァ・ダスト]",-1)
skillMap["80"] = new Skill(80,"[シャッフラー]",-1)
skillMap["81"] = new Skill(81,"[太古の呪怨]",-1)
skillMap["82"] = new Skill(82,"忌念の戦慄",43886)
skillMap["83"] = new Skill(83,"[怪光線]",-1)
skillMap["84"] = new Skill(84,"[大怪光線]",-1)
skillMap["85"] = new Skill(85,"[マッカビーム]",-1)
skillMap["86"] = new Skill(86,"[宵越し銭金]",-1)
skillMap["87"] = new Skill(87,"[魂砕波]",-1)
skillMap["101"] = new Skill(101,"ディア",112)
skillMap["102"] = new Skill(102,"ディアラマ",564)
skillMap["103"] = new Skill(103,"ディアラハン",5663)
skillMap["104"] = new Skill(104,"メディア",222)
skillMap["105"] = new Skill(105,"メディラマ",1666)
skillMap["106"] = new Skill(106,"メディアラハン",21943)
skillMap["107"] = new Skill(107,"メシアライザー",175543)
skillMap["108"] = new Skill(108,"パトラ",155)
skillMap["109"] = new Skill(109,"メパトラ",347)
skillMap["110"] = new Skill(110,"ポズムディ",112)
skillMap["111"] = new Skill(111,"パララディ",112)
skillMap["112"] = new Skill(112,"チャームディ",112)
skillMap["113"] = new Skill(113,"ペトラディ",112)
skillMap["114"] = new Skill(114,"クロズディ",112)
skillMap["115"] = new Skill(115,"ダウンディ",222)
skillMap["116"] = new Skill(116,"ボムディ",112)
skillMap["117"] = new Skill(117,"アムリタ",1666)
skillMap["118"] = new Skill(118,"リカーム",564)
skillMap["119"] = new Skill(119,"サマリカーム",10972)
skillMap["120"] = new Skill(120,"リカームドラ",43886)
skillMap["121"] = new Skill(121,"タルカジャ",347)
skillMap["122"] = new Skill(122,"スクカジャ",347)
skillMap["123"] = new Skill(123,"ラクカジャ",347)
skillMap["124"] = new Skill(124,"ラスタキャンディ",5663)
skillMap["125"] = new Skill(125,"デカジャ",952)
skillMap["126"] = new Skill(126,"タルンダ",222)
skillMap["127"] = new Skill(127,"スクンダ",222)
skillMap["128"] = new Skill(128,"ラクンダ",222)
skillMap["129"] = new Skill(129,"ランダマイザ",3020)
skillMap["130"] = new Skill(130,"デクンダ",952)
skillMap["131"] = new Skill(131,"静寂の祈り",10972)
skillMap["133"] = new Skill(133,"雄叫び",1666)
skillMap["134"] = new Skill(134,"フォッグブレス",1666)
skillMap["135"] = new Skill(135,"溶解ブレス",1666)
skillMap["136"] = new Skill(136,"挑発",952)
skillMap["137"] = new Skill(137,"天命反転",10972)
skillMap["138"] = new Skill(138,"魂捧げの夜伽",952)
skillMap["139"] = new Skill(139,"テトラカーン",10972)
skillMap["140"] = new Skill(140,"マカラカーン",10972)
skillMap["141"] = new Skill(141,"テトラジャ",3020)
skillMap["142"] = new Skill(142,"チャージ",1666)
skillMap["143"] = new Skill(143,"コンセントレイト",1666)
skillMap["144"] = new Skill(144,"捧魂の法",10972)
skillMap["145"] = new Skill(145,"ロストワード",10972)
skillMap["146"] = new Skill(146,"サバトマ",952)
skillMap["147"] = new Skill(147,"招来の舞踏",43886)
skillMap["151"] = new Skill(151,"突撃",112)
skillMap["152"] = new Skill(152,"爆砕拳",347)
skillMap["153"] = new Skill(153,"モータルジハード",1666)
skillMap["154"] = new Skill(154,"暴れまくり",952)
skillMap["155"] = new Skill(155,"メガトンプレス",10972)
skillMap["156"] = new Skill(156,"狂気の粉砕",43886)
skillMap["157"] = new Skill(157,"三日月斬り",112)
skillMap["158"] = new Skill(158,"渾身脳天割り",347)
skillMap["159"] = new Skill(159,"怪力乱神",1666)
skillMap["160"] = new Skill(160,"ヒートウェイブ",155)
skillMap["161"] = new Skill(161,"デスバウンド",564)
skillMap["162"] = new Skill(162,"冥界破",5663)
skillMap["163"] = new Skill(163,"引っ掻き",112)
skillMap["164"] = new Skill(164,"メガクロー",347)
skillMap["165"] = new Skill(165,"虚空爪激",1666)
skillMap["166"] = new Skill(166,"大切断",155)
skillMap["167"] = new Skill(167,"アクセルクロー",564)
skillMap["168"] = new Skill(168,"狂乱の剛爪",5663)
skillMap["169"] = new Skill(169,"牙折り",155)
skillMap["170"] = new Skill(170,"成仏の拳",222)
skillMap["171"] = new Skill(171,"狂気の暴虐",1666)
skillMap["172"] = new Skill(172,"[ナックルボム]",-1)
skillMap["173"] = new Skill(173,"奇襲",952)
skillMap["174"] = new Skill(174,"月影",564)
skillMap["175"] = new Skill(175,"残影",564)
skillMap["176"] = new Skill(176,"ベノンザッパー",1666)
skillMap["177"] = new Skill(177,"奥義一閃",21943)
skillMap["178"] = new Skill(178,"麻痺引っ掻き",222)
skillMap["179"] = new Skill(179,"毒引っ掻き",155)
skillMap["180"] = new Skill(180,"九十九針",112)
skillMap["181"] = new Skill(181,"地獄突き",347)
skillMap["182"] = new Skill(182,"グランドタック",1666)
skillMap["183"] = new Skill(183,"至高の魔弾",87772)
skillMap["184"] = new Skill(184,"八百万針",222)
skillMap["185"] = new Skill(185,"アローレイン",564)
skillMap["186"] = new Skill(186,"天扇弓",5663)
skillMap["187"] = new Skill(187,"夢見針",155)
skillMap["188"] = new Skill(188,"毒針",222)
skillMap["189"] = new Skill(189,"ピーターパイパー",347)
skillMap["190"] = new Skill(190,"魅了突き",347)
skillMap["191"] = new Skill(191,"切なさ乱れ撃ち",1666)
skillMap["192"] = new Skill(192,"刹那五月雨撃ち",43886)
skillMap["201"] = new Skill(201,"[火炎撃]",-1)
skillMap["202"] = new Skill(202,"[猛炎撃]",-1)
skillMap["203"] = new Skill(203,"[豪炎撃]",-1)
skillMap["204"] = new Skill(204,"[火炎乱撃]",-1)
skillMap["205"] = new Skill(205,"[猛炎乱撃]",-1)
skillMap["206"] = new Skill(206,"[豪炎乱撃]",-1)
skillMap["207"] = new Skill(207,"[氷結撃]",-1)
skillMap["208"] = new Skill(208,"[猛氷撃]",-1)
skillMap["209"] = new Skill(209,"[豪氷撃]",-1)
skillMap["210"] = new Skill(210,"[氷結乱撃]",-1)
skillMap["211"] = new Skill(211,"[猛氷乱撃]",-1)
skillMap["212"] = new Skill(212,"[豪氷乱撃]",-1)
skillMap["213"] = new Skill(213,"[雷電撃]",-1)
skillMap["214"] = new Skill(214,"[猛雷撃]",-1)
skillMap["215"] = new Skill(215,"[豪電撃]",-1)
skillMap["216"] = new Skill(216,"[雷電乱撃]",-1)
skillMap["217"] = new Skill(217,"[猛雷乱撃]",-1)
skillMap["218"] = new Skill(218,"[豪電乱撃]",-1)
skillMap["219"] = new Skill(219,"[疾風撃]",-1)
skillMap["220"] = new Skill(220,"[猛風撃]",-1)
skillMap["221"] = new Skill(221,"[豪風撃]",-1)
skillMap["222"] = new Skill(222,"[疾風乱撃]",-1)
skillMap["223"] = new Skill(223,"[猛風乱撃]",-1)
skillMap["224"] = new Skill(224,"[豪風乱撃]",-1)
skillMap["225"] = new Skill(225,"[至高の魔弾コピー]",-1)
skillMap["226"] = new Skill(226,"[フライシュッツ]",-1)
skillMap["227"] = new Skill(227,"[モーンバレット]",-1)
skillMap["228"] = new Skill(228,"[精密射撃]",-1)
skillMap["229"] = new Skill(229,"[ウィークショット]",-1)
skillMap["230"] = new Skill(230,"[グレイトフルワン]",-1)
skillMap["231"] = new Skill(231,"[掃射]",-1)
skillMap["232"] = new Skill(232,"[十字砲火]",-1)
skillMap["233"] = new Skill(233,"[デスペラード]",-1)
skillMap["234"] = new Skill(234,"[ＢＣ弾]",-1)
skillMap["235"] = new Skill(235,"[ランディショット]",-1)
skillMap["236"] = new Skill(236,"[影縫]",-1)
skillMap["237"] = new Skill(237,"[ロックバレット]",-1)
skillMap["238"] = new Skill(238,"[グッナイマム]",-1)
skillMap["239"] = new Skill(239,"[フィアーショット]",-1)
skillMap["240"] = new Skill(240,"[ヘッドショット]",-1)
skillMap["241"] = new Skill(241,"[レッグショット]",-1)
skillMap["242"] = new Skill(242,"[急所射撃]",-1)
skillMap["243"] = new Skill(243,"[アームショット]",-1)
skillMap["244"] = new Skill(244,"[アースライトレイ]",-1)
skillMap["245"] = new Skill(245,"[ムーンライトレイ]",-1)
skillMap["246"] = new Skill(246,"[猫パンチショット]",-1)
skillMap["247"] = new Skill(247,"[ソウルスキャナー]",-1)
skillMap["248"] = new Skill(248,"[仲間呼び]",-1)
skillMap["251"] = new Skill(251,"[ゲヘナ]",-1)
skillMap["252"] = new Skill(252,"[巨角の連撃]",-1)
skillMap["253"] = new Skill(253,"[幻虚夢]",-1)
skillMap["254"] = new Skill(254,"[秩序の光]",-1)
skillMap["255"] = new Skill(255,"[暴飲暴食]",-1)
skillMap["256"] = new Skill(256,"[食材調達]",-1)
skillMap["257"] = new Skill(257,"[エアダイブ]",-1)
skillMap["258"] = new Skill(258,"[丸かじり]",-1)
skillMap["259"] = new Skill(259,"[アスラローガ]",-1)
skillMap["260"] = new Skill(260,"[阿修羅]",-1)
skillMap["261"] = new Skill(261,"[極炎の闇]",-1)
skillMap["262"] = new Skill(262,"[災厄の輪廻]",-1)
skillMap["263"] = new Skill(263,"[豪雷]",-1)
skillMap["264"] = new Skill(264,"[シックウェイブ]",-1)
skillMap["265"] = new Skill(265,"[シングルショット]",-1)
skillMap["266"] = new Skill(266,"[ヘッドショット]",-1)
skillMap["267"] = new Skill(267,"[掃射]",-1)
skillMap["268"] = new Skill(268,"[母なる大地]",-1)
skillMap["269"] = new Skill(269,"[ピュアブルー]",-1)
skillMap["270"] = new Skill(270,"[黄昏の旋律]",-1)
skillMap["271"] = new Skill(271,"[幻影の秘儀]",-1)
skillMap["272"] = new Skill(272,"[極めし魔渦]",-1)
skillMap["273"] = new Skill(273,"[荒れ狂う暴乱]",-1)
skillMap["274"] = new Skill(274,"[ラビリンス]",-1)
skillMap["275"] = new Skill(275,"[巨斧の連撃]",-1)
skillMap["276"] = new Skill(276,"[クレオフィスの夢]",-1)
skillMap["277"] = new Skill(277,"[離別の光]",-1)
skillMap["278"] = new Skill(278,"[悪夢の晩餐]",-1)
skillMap["279"] = new Skill(279,"[食材調達]",-1)
skillMap["280"] = new Skill(280,"[エアダイブ]",-1)
skillMap["281"] = new Skill(281,"[丸かじり]",-1)
skillMap["282"] = new Skill(282,"[アスラローガ]",-1)
skillMap["283"] = new Skill(283,"[阿修羅]",-1)
skillMap["284"] = new Skill(284,"[極炎の闇]",-1)
skillMap["285"] = new Skill(285,"[天上打]",-1)
skillMap["286"] = new Skill(286,"[五月雨撃ち]",-1)
skillMap["287"] = new Skill(287,"[克己]",-1)
skillMap["288"] = new Skill(288,"[汚れ無き風]",-1)
skillMap["289"] = new Skill(289,"[大いなる嘆願]",-1)
skillMap["290"] = new Skill(290,"[ジャッジメント]",-1)
skillMap["291"] = new Skill(291,"[メル・ファイズ]",-1)
skillMap["292"] = new Skill(292,"[咎歌]",-1)
skillMap["293"] = new Skill(293,"[メギトの雷火]",-1)
skillMap["294"] = new Skill(294,"[ライトハンド]",-1)
skillMap["295"] = new Skill(295,"[天恵の矢]",-1)
skillMap["296"] = new Skill(296,"[レクイエム]",-1)
skillMap["297"] = new Skill(297,"[地獄の業火]",-1)
skillMap["298"] = new Skill(298,"[レフトハンド]",-1)
skillMap["299"] = new Skill(299,"[ケイオスタック]",-1)
skillMap["300"] = new Skill(300,"[混沌の悪夢]",-1)
skillMap["301"] = new Skill(301,"[ＭＡ]",-1)
skillMap["302"] = new Skill(302,"[始祖の理]",-1)
skillMap["303"] = new Skill(303,"[大洪水]",-1)
skillMap["304"] = new Skill(304,"[キス・マー]",-1)
skillMap["305"] = new Skill(305,"[メム＝アレフ]",-1)
skillMap["306"] = new Skill(306,"[メム＝アレフ]",-1)
skillMap["307"] = new Skill(307,"[メム＝アレフ]",-1)
skillMap["308"] = new Skill(308,"[断末波]",-1)
skillMap["309"] = new Skill(309,"[アスラローガ]",-1)
skillMap["310"] = new Skill(310,"[Ｅ．Ｎ．Ｄ．]",-1)
skillMap["311"] = new Skill(311,"[陰業]",-1)
skillMap["312"] = new Skill(312,"[当意即妙]",-1)
skillMap["313"] = new Skill(313,"[アギゲイト]",-1)
skillMap["314"] = new Skill(314,"[ブフゲイト]",-1)
skillMap["315"] = new Skill(315,"[ジオゲイト]",-1)
skillMap["316"] = new Skill(316,"[ガルゲイト]",-1)
skillMap["317"] = new Skill(317,"[ダークマター]",-1)
skillMap["318"] = new Skill(318,"[シャッフラー]",-1)
skillMap["319"] = new Skill(319,"[火]",-1)
skillMap["320"] = new Skill(320,"[氷]",-1)
skillMap["321"] = new Skill(321,"[雷]",-1)
skillMap["322"] = new Skill(322,"[風]",-1)
skillMap["323"] = new Skill(323,"[光]",-1)
skillMap["324"] = new Skill(324,"[闇]",-1)
skillMap["325"] = new Skill(325,"[メギドの雷火]",-1)
skillMap["326"] = new Skill(326,"[咎歌]",-1)
skillMap["327"] = new Skill(327,"[アギゲイト]",-1)
skillMap["328"] = new Skill(328,"[ブフゲイト]",-1)
skillMap["329"] = new Skill(329,"[ジオゲイト]",-1)
skillMap["330"] = new Skill(330,"[ガルゲイト]",-1)
skillMap["331"] = new Skill(331,"[キス・マー]",-1)
skillMap["332"] = new Skill(332,"[ジハード]",-1)
skillMap["333"] = new Skill(333,"[ディアラマ]",-1)
skillMap["334"] = new Skill(334,"[天上打]",-1)
skillMap["335"] = new Skill(335,"[マハムドオン]",-1)
skillMap["336"] = new Skill(336,"[マハンマオン]",-1)
skillMap["337"] = new Skill(337,"[災厄の輪廻]",-1)
skillMap["338"] = new Skill(338,"[ビッグバン]",-1)
skillMap["339"] = new Skill(339,"[ラスタキャンディ]",-1)
skillMap["340"] = new Skill(340,"てっけんせいさい",175543)
skillMap["341"] = new Skill(341,"うちまくり",175543)
skillMap["342"] = new Skill(342,"といき",175543)
skillMap["351"] = new Skill(351,"物理耐性",952)
skillMap["352"] = new Skill(352,"物理無効",10972)
skillMap["353"] = new Skill(353,"物理反射",43886)
skillMap["354"] = new Skill(354,"物理吸収",87772)
skillMap["355"] = new Skill(355,"銃耐性",952)
skillMap["356"] = new Skill(356,"銃無効",10972)
skillMap["357"] = new Skill(357,"銃反射",43886)
skillMap["358"] = new Skill(358,"銃吸収",87772)
skillMap["359"] = new Skill(359,"火炎耐性",564)
skillMap["360"] = new Skill(360,"火炎無効",5663)
skillMap["361"] = new Skill(361,"火炎反射",21943)
skillMap["362"] = new Skill(362,"火炎吸収",43886)
skillMap["363"] = new Skill(363,"氷結耐性",564)
skillMap["364"] = new Skill(364,"氷結無効",5663)
skillMap["365"] = new Skill(365,"氷結反射",21943)
skillMap["366"] = new Skill(366,"氷結吸収",43886)
skillMap["367"] = new Skill(367,"電撃耐性",564)
skillMap["368"] = new Skill(368,"電撃無効",5663)
skillMap["369"] = new Skill(369,"電撃反射",21943)
skillMap["370"] = new Skill(370,"電撃吸収",43886)
skillMap["371"] = new Skill(371,"疾風耐性",564)
skillMap["372"] = new Skill(372,"疾風無効",5663)
skillMap["373"] = new Skill(373,"疾風反射",21943)
skillMap["374"] = new Skill(374,"疾風吸収",43886)
skillMap["375"] = new Skill(375,"呪殺耐性",564)
skillMap["376"] = new Skill(376,"呪殺無効",3020)
skillMap["377"] = new Skill(377,"破魔耐性",564)
skillMap["378"] = new Skill(378,"破魔無効",3020)
skillMap["379"] = new Skill(379,"精神異常無効",10972)
skillMap["380"] = new Skill(380,"身体異常無効",21943)
skillMap["381"] = new Skill(381,"火炎ブースタ",564)
skillMap["382"] = new Skill(382,"火炎ハイブースタ",10972)
skillMap["383"] = new Skill(383,"氷結ブースタ",564)
skillMap["384"] = new Skill(384,"氷結ハイブースタ",10972)
skillMap["385"] = new Skill(385,"電撃ブースタ",564)
skillMap["386"] = new Skill(386,"電撃ハイブースタ",10972)
skillMap["387"] = new Skill(387,"疾風ブースタ",564)
skillMap["388"] = new Skill(388,"疾風ハイブースタ",10972)
skillMap["389"] = new Skill(389,"食いしばり",5663)
skillMap["390"] = new Skill(390,"不屈の闘志",87772)
skillMap["391"] = new Skill(391,"反撃",564)
skillMap["392"] = new Skill(392,"猛反撃",5663)
skillMap["393"] = new Skill(393,"勝利の息吹",3020)
skillMap["394"] = new Skill(394,"勝利のチャクラ",43886)
skillMap["395"] = new Skill(395,"勝利の雄叫び",175543)
skillMap["396"] = new Skill(396,"生命の泉",155)
skillMap["397"] = new Skill(397,"チャクラウォーク",3020)
skillMap["398"] = new Skill(398,"見覚えの成長",222)
skillMap["399"] = new Skill(399,"見覚えの大成長",952)
skillMap["400"] = new Skill(400,"アボイドスリーパ",3020)
skillMap["401"] = new Skill(401,"ラプラスの魔",1666)
skillMap["402"] = new Skill(402,"追撃の心得",21943)
skillMap["403"] = new Skill(403,"銃ハイブースタ",21943)
skillMap["405"] = new Skill(405,"[自動回復]",-1)
skillMap["406"] = new Skill(406,"[自動ダメージ]",-1)
skillMap["407"] = new Skill(407,"[永久の咎罰]",-1)
skillMap["408"] = new Skill(408,"[不負の法]",-1)
skillMap["409"] = new Skill(409,"物理ブースタ",952)
skillMap["410"] = new Skill(410,"物理ハイブースタ",21943)
skillMap["411"] = new Skill(411,"銃ブースタ",952)
skillMap["412"] = new Skill(412,"回復ブースタ",347)
skillMap["413"] = new Skill(413,"回復ハイブースタ",5663)
skillMap["414"] = new Skill(414,"一分の活泉",222)
skillMap["415"] = new Skill(415,"二分の活泉",1666)
skillMap["416"] = new Skill(416,"三分の活泉",21943)
skillMap["417"] = new Skill(417,"一分の魔脈",222)
skillMap["418"] = new Skill(418,"二分の魔脈",1666)
skillMap["419"] = new Skill(419,"三分の魔脈",21943)//}}}


var devilJSON = {
  //{{{
  "1":{    "attr":[3,3,6,2,1,1,4,3],"id": 1, "genusID":1,"name": "セラフ", "devilCost": 38, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [40, 43, 107, 0, 0,0], "lvDefault": 89, "strDefault": 52, "intDefault": 64, "vitDefault": 57, "agiDefault": 55, "lucDefault": 59, "showDefault":true },
  "2":{    "attr":[1,4,3,3,3,3,4,1],"id": 2, "genusID":1,"name": "メタトロン", "devilCost": 22, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [39, 62, 121, 0, 0,0], "lvDefault": 84, "strDefault": 57, "intDefault": 54, "vitDefault": 55, "agiDefault": 48, "lucDefault": 53, "showDefault":true },
  "3":{    "attr":[1,1,1,1,3,2,4,3],"id": 3, "genusID":1,"name": "スラオシャ", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [43, 103, 397, 0, 0,0], "lvDefault": 74, "strDefault": 50, "intDefault": 44, "vitDefault": 43, "agiDefault": 53, "lucDefault": 47, "showDefault":true },
  "4":{    "attr":[1,1,1,2,1,1,4,4],"id": 4, "genusID":1,"name": "アズラエル", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [8, 54, 119, 0, 0,0], "lvDefault": 69, "strDefault": 45, "intDefault": 49, "vitDefault": 41, "agiDefault": 40, "lucDefault": 47, "showDefault":true },
  "5":{    "attr":[1,1,2,6,1,1,4,3],"id": 5, "genusID":1,"name": "イスラフィール", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [51, 120, 366, 0, 0,0], "lvDefault": 63, "strDefault": 38, "intDefault": 46, "vitDefault": 37, "agiDefault": 43, "lucDefault": 40, "showDefault":true },
  "6":{    "attr":[1,4,1,1,2,1,4,4],"id": 6, "genusID":1,"name": "ヴィクター", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [37, 185, 376, 0, 0,0], "lvDefault": 51, "strDefault": 37, "intDefault": 29, "vitDefault": 35, "agiDefault": 31, "lucDefault": 36, "showDefault":true },
  "7":{    "attr":[1,1,1,1,4,2,4,3],"id": 7, "genusID":1,"name": "ハニエル", "devilCost": 23, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [21, 61, 103, 0, 0,0], "lvDefault": 79, "strDefault": 50, "intDefault": 53, "vitDefault": 47, "agiDefault": 53, "lucDefault": 49, "showDefault":true },
  "8":{    "attr":[1,1,1,1,2,4,4,3],"id": 8, "genusID":1,"name": "カズフェル", "devilCost": 23, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [30, 142, 162, 0, 0,0], "lvDefault": 66, "strDefault": 42, "intDefault": 40, "vitDefault": 46, "agiDefault": 41, "lucDefault": 44, "showDefault":true },
  "9":{    "attr":[1,1,5,1,1,1,4,4],"id": 9, "genusID":2,"name": "アマテラス", "devilCost": 18, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [6, 106, 129, 0, 0,0], "lvDefault": 79, "strDefault": 48, "intDefault": 52, "vitDefault": 51, "agiDefault": 50, "lucDefault": 56, "showDefault":true },
  "10":{   "attr":[1,1,1,1,2,1,4,1],"id": 10, "genusID":2,"name": "ラクシュミ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [103, 147, 394, 0, 0,0], "lvDefault": 73, "strDefault": 40, "intDefault": 49, "vitDefault": 43, "agiDefault": 47, "lucDefault": 55, "showDefault":true },
  "11":{   "attr":[1,1,1,1,1,1,4,4],"id": 11, "genusID":2,"name": "ノルン", "devilCost": 24, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [117, 145, 401, 0, 0,0], "lvDefault": 72, "strDefault": 46, "intDefault": 49, "vitDefault": 46, "agiDefault": 44, "lucDefault": 51, "showDefault":true },
  "12":{   "attr":[1,1,1,6,1,1,3,4],"id": 12, "genusID":2,"name": "トラソルテオトル", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [14, 120, 138, 0, 0,0], "lvDefault": 64, "strDefault": 40, "intDefault": 46, "vitDefault": 41, "agiDefault": 38, "lucDefault": 42, "showDefault":true },
  "13":{   "attr":[3,5,1,1,1,1,4,2],"id": 13, "genusID":2,"name": "パラスアテナ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [140, 153, 397, 0, 0,0], "lvDefault": 53, "strDefault": 37, "intDefault": 30, "vitDefault": 36, "agiDefault": 39, "lucDefault": 32, "showDefault":true },
  "14":{   "attr":[1,3,1,1,2,4,1,4],"id": 14, "genusID":2,"name": "スカアハ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [30, 131, 185, 0, 0,0], "lvDefault": 43, "strDefault": 34, "intDefault": 25, "vitDefault": 30, "agiDefault": 32, "lucDefault": 23, "showDefault":true },
  "15":{   "attr":[1,1,1,1,1,1,4,1],"id": 15, "genusID":2,"name": "パールヴァティ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [37, 105, 0, 0, 0,0], "lvDefault": 32, "strDefault": 20, "intDefault": 25, "vitDefault": 21, "agiDefault": 22, "lucDefault": 23, "showDefault":true },
  "16":{   "attr":[1,1,1,1,2,3,3,1],"id": 16, "genusID":2,"name": "フォルトゥナ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [31, 105, 122, 0, 0,0], "lvDefault": 20, "strDefault": 12, "intDefault": 17, "vitDefault": 13, "agiDefault": 15, "lucDefault": 18, "showDefault":true },
  "17":{   "attr":[2,2,1,1,1,1,1,1],"id": 17, "genusID":2,"name": "ハトホル", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [31, 104, 0, 0, 0,0], "lvDefault": 11, "strDefault": 9, "intDefault": 12, "vitDefault": 8, "agiDefault": 9, "lucDefault": 10, "showDefault":true },
  "18":{   "attr":[1,1,1,1,1,6,4,2],"id": 18, "genusID":2,"name": "イシュタル", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [117, 131, 147, 0, 0,0], "lvDefault": 51, "strDefault": 33, "intDefault": 38, "vitDefault": 33, "agiDefault": 34, "lucDefault": 35, "showDefault":true },
  "19":{   "attr":[0,0,0,0,0,0,0,0],"id": 19, "genusID":2,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "20":{   "attr":[1,2,5,2,1,4,3,1],"id": 20, "genusID":3,"name": "ガルーダ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [30, 117, 168, 0, 0,0], "lvDefault": 71, "strDefault": 44, "intDefault": 43, "vitDefault": 40, "agiDefault": 52, "lucDefault": 49, "showDefault":true },
  "21":{   "attr":[1,2,6,2,1,1,4,1],"id": 21, "genusID":3,"name": "ヤタガラス", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [6, 109, 122, 0, 0,0], "lvDefault": 59, "strDefault": 37, "intDefault": 38, "vitDefault": 35, "agiDefault": 43, "lucDefault": 39, "showDefault":true },
  "22":{   "attr":[1,2,4,2,1,1,4,1],"id": 22, "genusID":3,"name": "スザク", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [7, 382, 0, 0, 0,0], "lvDefault": 46, "strDefault": 34, "intDefault": 27, "vitDefault": 30, "agiDefault": 33, "lucDefault": 29, "showDefault":true },
  "23":{   "attr":[1,2,1,1,5,1,1,1],"id": 23, "genusID":3,"name": "サンダーバード", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [23, 173, 385, 0, 0,0], "lvDefault": 35, "strDefault": 26, "intDefault": 21, "vitDefault": 22, "agiDefault": 28, "lucDefault": 23, "showDefault":true },
  "24":{   "attr":[1,2,6,2,1,1,4,4],"id": 24, "genusID":3,"name": "フェニックス", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [7, 118, 0, 0, 0,0], "lvDefault": 25, "strDefault": 15, "intDefault": 22, "vitDefault": 14, "agiDefault": 19, "lucDefault": 20, "showDefault":true },
  "25":{   "attr":[1,2,3,1,1,4,1,1],"id": 25, "genusID":3,"name": "スパルナ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [29, 387, 0, 0, 0,0], "lvDefault": 15, "strDefault": 11, "intDefault": 12, "vitDefault": 9, "agiDefault": 15, "lucDefault": 13, "showDefault":true },
  "26":{   "attr":[1,2,1,1,3,2,1,1],"id": 26, "genusID":3,"name": "ハンサ", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [22, 75, 125, 0, 0,0], "lvDefault": 9, "strDefault": 6, "intDefault": 9, "vitDefault": 9, "agiDefault": 10, "lucDefault": 8, "showDefault":true },
  "27":{   "attr":[0,0,0,0,0,0,0,0],"id": 27, "genusID":3,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "28":{   "attr":[0,0,0,0,0,0,0,0],"id": 28, "genusID":3,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "29":{   "attr":[1,6,2,1,1,1,1,1],"id": 29, "genusID":4,"name": "イグドラジル", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [125, 182, 358, 0, 0,0], "lvDefault": 64, "strDefault": 46, "intDefault": 39, "vitDefault": 50, "agiDefault": 35, "lucDefault": 42, "showDefault":true },
  "30":{   "attr":[1,3,2,1,1,1,4,4],"id": 30, "genusID":4,"name": "ハオマ", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [103, 141, 184, 0, 0,0], "lvDefault": 55, "strDefault": 36, "intDefault": 41, "vitDefault": 35, "agiDefault": 30, "lucDefault": 38, "showDefault":true },
  "31":{   "attr":[1,3,2,1,3,1,3,3],"id": 31, "genusID":4,"name": "ククノチ", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [116, 121, 182, 0, 0,0], "lvDefault": 44, "strDefault": 28, "intDefault": 35, "vitDefault": 26, "agiDefault": 30, "lucDefault": 28, "showDefault":true },
  "32":{   "attr":[2,3,2,1,1,1,1,1],"id": 32, "genusID":4,"name": "マヤウェル", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [109, 118, 394, 0, 0,0], "lvDefault": 35, "strDefault": 22, "intDefault": 28, "vitDefault": 20, "agiDefault": 26, "lucDefault": 24, "showDefault":true },
  "33":{   "attr":[1,1,2,1,1,1,3,3],"id": 33, "genusID":4,"name": "ダフネ", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [113, 123, 125, 0, 0,0], "lvDefault": 21, "strDefault": 13, "intDefault": 21, "vitDefault": 12, "agiDefault": 16, "lucDefault": 16, "showDefault":true },
  "34":{   "attr":[0,0,0,0,0,0,0,0],"id": 34, "genusID":4,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "35":{   "attr":[0,0,0,0,0,0,0,0],"id": 35, "genusID":4,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "36":{   "attr":[1,1,1,1,2,5,4,1],"id": 36, "genusID":5,"name": "ケルプ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [38, 61, 186, 0, 0,0], "lvDefault": 61, "strDefault": 38, "intDefault": 44, "vitDefault": 36, "agiDefault": 38, "lucDefault": 37, "showDefault":true },
  "37":{   "attr":[1,1,4,2,1,1,4,1],"id": 37, "genusID":5,"name": "ソロネ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [3, 61, 105, 0, 0,0], "lvDefault": 47, "strDefault": 26, "intDefault": 39, "vitDefault": 27, "agiDefault": 29, "lucDefault": 30, "showDefault":true },
  "38":{   "attr":[1,1,1,1,1,2,4,2],"id": 38, "genusID":5,"name": "ドミニオン", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [37, 60, 120, 0, 0,0], "lvDefault": 38, "strDefault": 28, "intDefault": 30, "vitDefault": 22, "agiDefault": 20, "lucDefault": 24, "showDefault":true },
  "39":{   "attr":[1,1,1,1,2,3,4,2],"id": 39, "genusID":5,"name": "ヴァーチャー", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [29, 59, 118, 0, 0,0], "lvDefault": 25, "strDefault": 13, "intDefault": 22, "vitDefault": 15, "agiDefault": 19, "lucDefault": 16, "showDefault":true },
  "40":{   "attr":[1,1,1,1,1,1,4,2],"id": 40, "genusID":5,"name": "パワー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [60, 181, 0, 0, 0,0], "lvDefault": 19, "strDefault": 18, "intDefault": 11, "vitDefault": 13, "agiDefault": 13, "lucDefault": 12, "showDefault":true },
  "41":{   "attr":[1,2,1,1,1,2,4,2],"id": 41, "genusID":5,"name": "プリンシパリティ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [20, 58, 0, 0, 0,0], "lvDefault": 14, "strDefault": 11, "intDefault": 13, "vitDefault": 11, "agiDefault": 9, "lucDefault": 8, "showDefault":true },
  "42":{   "attr":[1,1,1,1,2,1,4,2],"id": 42, "genusID":5,"name": "アークエンジェル", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [58, 157, 0, 0, 0,0], "lvDefault": 8, "strDefault": 9, "intDefault": 8, "vitDefault": 7, "agiDefault": 5, "lucDefault": 5, "showDefault":true },
  "43":{   "attr":[1,2,1,1,1,1,4,2],"id": 43, "genusID":5,"name": "エンジェル", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [58, 101, 0, 0, 0,0], "lvDefault": 4, "strDefault": 3, "intDefault": 7, "vitDefault": 5, "agiDefault": 4, "lucDefault": 3, "showDefault":true },
  "44":{   "attr":[0,0,0,0,0,0,0,0],"id": 44, "genusID":5,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "45":{   "attr":[0,0,0,0,0,0,0,0],"id": 45, "genusID":5,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "46":{   "attr":[1,2,1,1,1,4,1,1],"id": 46, "genusID":6,"name": "タイホウ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [33, 393, 0, 0, 0,0], "lvDefault": 50, "strDefault": 34, "intDefault": 31, "vitDefault": 26, "agiDefault": 39, "lucDefault": 30, "showDefault":true },
  "47":{   "attr":[1,3,2,1,1,1,1,1],"id": 47, "genusID":6,"name": "ルフ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [14, 113, 165, 0, 0,0], "lvDefault": 42, "strDefault": 24, "intDefault": 24, "vitDefault": 29, "agiDefault": 34, "lucDefault": 25, "showDefault":true },
  "48":{   "attr":[1,2,1,1,2,1,1,1],"id": 48, "genusID":6,"name": "タンガタ・マヌ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [10, 180, 0, 0, 0,0], "lvDefault": 2, "strDefault": 3, "intDefault": 2, "vitDefault": 2, "agiDefault": 5, "lucDefault": 4, "showDefault":true },
  "49":{   "attr":[1,2,1,1,1,1,1,1],"id": 49, "genusID":6,"name": "カラドリウス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [109, 113, 140, 0, 0,0], "lvDefault": 22, "strDefault": 12, "intDefault": 17, "vitDefault": 13, "agiDefault": 19, "lucDefault": 15, "showDefault":true },
  "50":{   "attr":[1,1,2,1,1,2,1,1],"id": 50, "genusID":6,"name": "コカクチョウ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [49, 128, 0, 0, 0,0], "lvDefault": 15, "strDefault": 10, "intDefault": 9, "vitDefault": 9, "agiDefault": 16, "lucDefault": 11, "showDefault":true },
  "51":{   "attr":[1,2,1,1,2,1,1,1],"id": 51, "genusID":6,"name": "ハーピー", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [31, 112, 122, 0, 0,0], "lvDefault": 9, "strDefault": 6, "intDefault": 6, "vitDefault": 6, "agiDefault": 12, "lucDefault": 7, "showDefault":true },
  "52":{   "attr":[1,2,2,3,1,3,1,1],"id": 52, "genusID":6,"name": "タクヒ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [34, 127, 0, 0, 0,0], "lvDefault": 31, "strDefault": 18, "intDefault": 18, "vitDefault": 20, "agiDefault": 27, "lucDefault": 20, "showDefault":true },
  "53":{   "attr":[0,0,0,0,0,0,0,0],"id": 53, "genusID":6,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "54":{   "attr":[0,0,0,0,0,0,0,0],"id": 54, "genusID":6,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "55":{   "attr":[3,1,1,1,2,5,4,1],"id": 55, "genusID":7,"name": "ガネーシャ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [35, 373, 389, 0, 0,0], "lvDefault": 67, "strDefault": 47, "intDefault": 41, "vitDefault": 45, "agiDefault": 37, "lucDefault": 41, "showDefault":true },
  "56":{   "attr":[1,4,4,2,1,1,1,4],"id": 56, "genusID":7,"name": "シウテクトリ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [6, 182, 0, 0, 0,0], "lvDefault": 54, "strDefault": 34, "intDefault": 34, "vitDefault": 35, "agiDefault": 38, "lucDefault": 31, "showDefault":true },
  "57":{   "attr":[3,1,2,1,1,1,3,3],"id": 57, "genusID":7,"name": "ヴァルキリー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [139, 144, 153, 0, 0,0], "lvDefault": 45, "strDefault": 33, "intDefault": 26, "vitDefault": 30, "agiDefault": 30, "lucDefault": 26, "showDefault":true },
  "58":{   "attr":[3,3,1,2,1,1,1,1],"id": 58, "genusID":7,"name": "シワンナ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [4, 109, 130, 0, 0,0], "lvDefault": 37, "strDefault": 19, "intDefault": 30, "vitDefault": 25, "agiDefault": 23, "lucDefault": 24, "showDefault":true },
  "59":{   "attr":[1,2,1,1,3,3,1,1],"id": 59, "genusID":7,"name": "ディース", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [32, 75, 0, 0, 0,0], "lvDefault": 27, "strDefault": 16, "intDefault": 23, "vitDefault": 16, "agiDefault": 18, "lucDefault": 18, "showDefault":true },
  "60":{   "attr":[1,1,5,2,2,3,4,1],"id": 60, "genusID":7,"name": "カラステング", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [34, 58, 0, 0, 0,0], "lvDefault": 18, "strDefault": 10, "intDefault": 12, "vitDefault": 13, "agiDefault": 16, "lucDefault": 13, "showDefault":true },
  "61":{   "attr":[1,1,1,3,3,2,1,1],"id": 61, "genusID":7,"name": "ヴォジャノーイ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [22, 180, 0, 0, 0,0], "lvDefault": 13, "strDefault": 9, "intDefault": 13, "vitDefault": 10, "agiDefault": 9, "lucDefault": 8, "showDefault":true },
  "62":{   "attr":[1,2,1,1,1,1,1,1],"id": 62, "genusID":7,"name": "コッパテング", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [28, 121, 0, 0, 0,0], "lvDefault": 5, "strDefault": 3, "intDefault": 6, "vitDefault": 5, "agiDefault": 7, "lucDefault": 4, "showDefault":true },
  "63":{   "attr":[0,0,0,0,0,0,0,0],"id": 63, "genusID":7,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "64":{   "attr":[0,0,0,0,0,0,0,0],"id": 64, "genusID":7,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "65":{   "attr":[1,1,6,2,1,1,4,1],"id": 65, "genusID":8,"name": "ペリ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [103, 111, 397, 0, 0,0], "lvDefault": 59, "strDefault": 35, "intDefault": 44, "vitDefault": 34, "agiDefault": 34, "lucDefault": 40, "showDefault":true },
  "66":{   "attr":[1,1,2,4,1,1,4,3],"id": 66, "genusID":8,"name": "サラスヴァティ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [15, 105, 119, 0, 0,0], "lvDefault": 48, "strDefault": 29, "intDefault": 35, "vitDefault": 28, "agiDefault": 26, "lucDefault": 36, "showDefault":true },
  "67":{   "attr":[1,1,1,1,2,1,4,1],"id": 67, "genusID":8,"name": "センリ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [32, 105, 190, 0, 0,0], "lvDefault": 36, "strDefault": 18, "intDefault": 26, "vitDefault": 22, "agiDefault": 25, "lucDefault": 27, "showDefault":true },
  "68":{   "attr":[1,1,1,1,1,1,4,1],"id": 68, "genusID":8,"name": "アメノウズメ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [131, 146, 0, 0, 0,0], "lvDefault": 24, "strDefault": 13, "intDefault": 16, "vitDefault": 15, "agiDefault": 16, "lucDefault": 22, "showDefault":true },
  "69":{   "attr":[1,1,2,1,1,1,1,1],"id": 69, "genusID":8,"name": "アプサラス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [10, 64, 101, 0, 0,0], "lvDefault": 10, "strDefault": 5, "intDefault": 10, "vitDefault": 6, "agiDefault": 7, "lucDefault": 12, "showDefault":true },
  "70":{   "attr":[0,0,0,0,0,0,0,0],"id": 70, "genusID":8,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "71":{   "attr":[1,1,3,3,3,3,4,4],"id": 71, "genusID":9,"name": "デミウルゴス", "devilCost": 51, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [41, 124, 395, 0, 0,0], "lvDefault": 94, "strDefault": 66, "intDefault": 64, "vitDefault": 59, "agiDefault": 60, "lucDefault": 53, "showDefault":true },
  "72":{   "attr":[1,1,1,2,4,4,1,4],"id": 72, "genusID":9,"name": "セト", "devilCost": 23, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [72, 133, 168, 0, 0,0], "lvDefault": 85, "strDefault": 59, "intDefault": 55, "vitDefault": 54, "agiDefault": 53, "lucDefault": 49, "showDefault":true },
  "73":{   "attr":[1,1,1,1,1,1,2,4],"id": 73, "genusID":9,"name": "サマエル", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [38, 103, 119, 0, 0,0], "lvDefault": 75, "strDefault": 53, "intDefault": 48, "vitDefault": 47, "agiDefault": 44, "lucDefault": 46, "showDefault":true },
  "74":{   "attr":[1,1,2,3,1,1,4,4],"id": 74, "genusID":9,"name": "パレス", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [15, 125, 399, 0, 0,0], "lvDefault": 68, "strDefault": 39, "intDefault": 48, "vitDefault": 42, "agiDefault": 41, "lucDefault": 44, "showDefault":true },
  "75":{   "attr":[4,4,2,2,2,2,1,4],"id": 75, "genusID":9,"name": "トウテツ", "devilCost": 16, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [171, 380, 0, 0, 0,0], "lvDefault": 53, "strDefault": 39, "intDefault": 33, "vitDefault": 30, "agiDefault": 35, "lucDefault": 32, "showDefault":true },
  "76":{   "attr":[1,1,1,1,2,1,4,4],"id": 76, "genusID":9,"name": "パチャカマク", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [32, 115, 143, 0, 0,0], "lvDefault": 48, "strDefault": 30, "intDefault": 30, "vitDefault": 28, "agiDefault": 30, "lucDefault": 36, "showDefault":true },
  "77":{   "attr":[1,1,1,2,3,3,4,4],"id": 77, "genusID":9,"name": "ミシャグジさま", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [23, 135, 0, 0, 0,0], "lvDefault": 39, "strDefault": 25, "intDefault": 28, "vitDefault": 19, "agiDefault": 30, "lucDefault": 25, "showDefault":true },
  "78":{   "attr":[1,1,1,1,1,1,2,4],"id": 78, "genusID":9,"name": "バフォメット", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [55, 134, 0, 0, 0,0], "lvDefault": 26, "strDefault": 14, "intDefault": 23, "vitDefault": 15, "agiDefault": 19, "lucDefault": 17, "showDefault":true },
  "79":{   "attr":[2,2,1,3,1,3,2,4],"id": 79, "genusID":9,"name": "アルシエル", "devilCost": 18, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [162, 391, 415, 0, 0,0], "lvDefault": 61, "strDefault": 43, "intDefault": 42, "vitDefault": 40, "agiDefault": 39, "lucDefault": 39, "showDefault":true },
  "80":{   "attr":[0,0,0,0,0,0,0,0],"id": 80, "genusID":9,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "81":{   "attr":[1,2,2,5,1,5,1,1],"id": 81, "genusID":10,"name": "フレスベルグ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [16, 30, 165, 0, 0,0], "lvDefault": 70, "strDefault": 38, "intDefault": 46, "vitDefault": 43, "agiDefault": 51, "lucDefault": 42, "showDefault":true },
  "82":{   "attr":[1,2,6,2,1,1,1,1],"id": 82, "genusID":10,"name": "カウ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [7, 46, 114, 0, 0,0], "lvDefault": 64, "strDefault": 37, "intDefault": 45, "vitDefault": 38, "agiDefault": 44, "lucDefault": 38, "showDefault":true },
  "83":{   "attr":[1,2,1,1,6,2,4,1],"id": 83, "genusID":10,"name": "アンズー", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [21, 108, 165, 0, 0,0], "lvDefault": 49, "strDefault": 31, "intDefault": 30, "vitDefault": 30, "agiDefault": 39, "lucDefault": 27, "showDefault":true },
  "84":{   "attr":[1,2,1,1,1,1,2,4],"id": 84, "genusID":10,"name": "グルル", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [30, 109, 178, 0, 0,0], "lvDefault": 40, "strDefault": 23, "intDefault": 27, "vitDefault": 22, "agiDefault": 33, "lucDefault": 25, "showDefault":true },
  "85":{   "attr":[1,2,1,2,1,1,1,3],"id": 85, "genusID":10,"name": "チン", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [66, 179, 0, 0, 0,0], "lvDefault": 28, "strDefault": 19, "intDefault": 17, "vitDefault": 18, "agiDefault": 23, "lucDefault": 17, "showDefault":true },
  "86":{   "attr":[3,5,1,1,2,1,1,1],"id": 86, "genusID":10,"name": "カマソッソ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [160, 175, 355, 0, 0,0], "lvDefault": 31, "strDefault": 18, "intDefault": 17, "vitDefault": 22, "agiDefault": 27, "lucDefault": 19, "showDefault":true },
  "87":{   "attr":[1,2,1,1,2,3,1,1],"id": 87, "genusID":10,"name": "モー・ショボー", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [29, 101, 0, 0, 0,0], "lvDefault": 17, "strDefault": 11, "intDefault": 13, "vitDefault": 10, "agiDefault": 16, "lucDefault": 11, "showDefault":true },
  "88":{   "attr":[1,2,1,2,1,1,1,1],"id": 88, "genusID":10,"name": "イツマデ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 127, 163, 0, 0,0], "lvDefault": 7, "strDefault": 6, "intDefault": 4, "vitDefault": 7, "agiDefault": 9, "lucDefault": 5, "showDefault":true },
  "89":{   "attr":[1,2,1,2,1,1,1,1],"id": 89, "genusID":10,"name": "オンモラキ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 0, 0, 0, 0,0], "lvDefault": 3, "strDefault": 3, "intDefault": 3, "vitDefault": 2, "agiDefault": 6, "lucDefault": 5, "showDefault":true },
  "90":{   "attr":[0,0,0,0,0,0,0,0],"id": 90, "genusID":10,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "91":{   "attr":[0,0,0,0,0,0,0,0],"id": 91, "genusID":10,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "92":{   "attr":[1,5,2,1,1,1,3,4],"id": 92, "genusID":11,"name": "アールキング", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [24, 192, 0, 0, 0,0], "lvDefault": 61, "strDefault": 37, "intDefault": 38, "vitDefault": 42, "agiDefault": 36, "lucDefault": 40, "showDefault":true },
  "93":{   "attr":[1,1,2,1,1,1,1,1],"id": 93, "genusID":11,"name": "アルラウネ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [70, 112, 398, 0, 0,0], "lvDefault": 51, "strDefault": 33, "intDefault": 32, "vitDefault": 35, "agiDefault": 30, "lucDefault": 33, "showDefault":true },
  "94":{   "attr":[1,1,2,2,1,1,1,3],"id": 94, "genusID":11,"name": "ザックーム", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [7, 68, 135, 0, 0,0], "lvDefault": 42, "strDefault": 26, "intDefault": 24, "vitDefault": 33, "agiDefault": 25, "lucDefault": 28, "showDefault":true },
  "95":{   "attr":[1,1,2,1,1,3,3,3],"id": 95, "genusID":11,"name": "スクーグスロー", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [121, 184, 0, 0, 0,0], "lvDefault": 29, "strDefault": 22, "intDefault": 22, "vitDefault": 16, "agiDefault": 21, "lucDefault": 16, "showDefault":true },
  "96":{   "attr":[1,1,2,1,1,1,1,4],"id": 96, "genusID":11,"name": "マンドレイク", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [68, 102, 111, 0, 0,0], "lvDefault": 22, "strDefault": 13, "intDefault": 17, "vitDefault": 17, "agiDefault": 11, "lucDefault": 18, "showDefault":true },
  "97":{   "attr":[1,1,2,1,1,1,1,1],"id": 97, "genusID":11,"name": "サンショウ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [16, 396, 0, 0, 0,0], "lvDefault": 14, "strDefault": 9, "intDefault": 9, "vitDefault": 14, "agiDefault": 8, "lucDefault": 12, "showDefault":true },
  "98":{   "attr":[0,0,0,0,0,0,0,0],"id": 98, "genusID":11,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "99":{   "attr":[0,0,0,0,0,0,0,0],"id": 99, "genusID":11,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "100":{  "attr":[5,5,1,1,1,1,4,4],"id": 100, "genusID":12,"name": "ヴィシュヌ", "devilCost": 22, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [39, 107, 183, 0, 0,0], "lvDefault": 86, "strDefault": 51, "intDefault": 60, "vitDefault": 53, "agiDefault": 54, "lucDefault": 55, "showDefault":true },
  "101":{  "attr":[1,1,4,1,3,2,4,4],"id": 101, "genusID":12,"name": "ハチマン", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [24, 44, 139, 0, 0,0], "lvDefault": 77, "strDefault": 50, "intDefault": 59, "vitDefault": 45, "agiDefault": 47, "lucDefault": 45, "showDefault":true },
  "102":{  "attr":[1,5,1,3,5,2,1,1],"id": 102, "genusID":12,"name": "オーディン", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [17, 26, 143, 0, 0,0], "lvDefault": 71, "strDefault": 47, "intDefault": 51, "vitDefault": 47, "agiDefault": 42, "lucDefault": 41, "showDefault":true },
  "103":{  "attr":[1,1,1,1,1,1,4,4],"id": 103, "genusID":12,"name": "オメテオトル", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [3, 12, 137, 0, 0,0], "lvDefault": 65, "strDefault": 40, "intDefault": 47, "vitDefault": 38, "agiDefault": 43, "lucDefault": 42, "showDefault":true },
  "104":{  "attr":[3,1,6,2,1,1,3,3],"id": 104, "genusID":12,"name": "プロメテウス", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [38, 120, 138, 0, 0,0], "lvDefault": 57, "strDefault": 42, "intDefault": 32, "vitDefault": 40, "agiDefault": 36, "lucDefault": 36, "showDefault":true },
  "105":{  "attr":[1,1,3,2,3,1,3,1],"id": 105, "genusID":12,"name": "インティ", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [5, 23, 102, 0, 0,0], "lvDefault": 49, "strDefault": 38, "intDefault": 31, "vitDefault": 33, "agiDefault": 26, "lucDefault": 34, "showDefault":true },
  "106":{  "attr":[2,2,1,4,4,6,1,1],"id": 106, "genusID":12,"name": "トート", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [121, 126, 140, 0, 0,0], "lvDefault": 41, "strDefault": 23, "intDefault": 30, "vitDefault": 24, "agiDefault": 32, "lucDefault": 29, "showDefault":true },
  "107":{  "attr":[0,0,0,0,0,0,0,0],"id": 107, "genusID":12,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "108":{  "attr":[0,0,0,0,0,0,0,0],"id": 108, "genusID":12,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "109":{  "attr":[3,1,1,1,1,1,4,4],"id": 109, "genusID":13,"name": "バロン", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [153, 169, 389, 0, 0,0], "lvDefault": 69, "strDefault": 50, "intDefault": 39, "vitDefault": 45, "agiDefault": 44, "lucDefault": 44, "showDefault":true },
  "110":{  "attr":[1,1,1,1,1,1,4,4],"id": 110, "genusID":13,"name": "アヌビス", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [56, 62, 119, 0, 0,0], "lvDefault": 61, "strDefault": 35, "intDefault": 44, "vitDefault": 38, "agiDefault": 39, "lucDefault": 42, "showDefault":true },
  "111":{  "attr":[3,1,4,2,4,1,1,1],"id": 111, "genusID":13,"name": "キマイラ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [25, 164, 385, 0, 0,0], "lvDefault": 49, "strDefault": 41, "intDefault": 28, "vitDefault": 33, "agiDefault": 29, "lucDefault": 31, "showDefault":true },
  "112":{  "attr":[1,1,1,1,1,1,4,2],"id": 112, "genusID":13,"name": "カイメイジュウ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [125, 141, 167, 0, 0,0], "lvDefault": 43, "strDefault": 33, "intDefault": 25, "vitDefault": 30, "agiDefault": 29, "lucDefault": 27, "showDefault":true },
  "113":{  "attr":[3,1,4,1,1,1,4,1],"id": 113, "genusID":13,"name": "マカミ", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [139, 184, 351, 0, 0,0], "lvDefault": 32, "strDefault": 29, "intDefault": 19, "vitDefault": 20, "agiDefault": 23, "lucDefault": 20, "showDefault":true },
  "114":{  "attr":[1,1,3,2,3,2,1,1],"id": 114, "genusID":13,"name": "カマプアア", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [67, 111, 151, 0, 0,0], "lvDefault": 24, "strDefault": 21, "intDefault": 18, "vitDefault": 17, "agiDefault": 14, "lucDefault": 17, "showDefault":true },
  "115":{  "attr":[1,1,2,1,4,1,4,1],"id": 115, "genusID":13,"name": "シーサー", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [20, 133, 391, 0, 0,0], "lvDefault": 14, "strDefault": 15, "intDefault": 8, "vitDefault": 12, "agiDefault": 14, "lucDefault": 8, "showDefault":true },
  "116":{  "attr":[0,0,0,0,0,0,0,0],"id": 116, "genusID":13,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "117":{  "attr":[0,0,0,0,0,0,0,0],"id": 117, "genusID":13,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "118":{  "attr":[1,1,1,1,1,1,4,2],"id": 118, "genusID":14,"name": "スフィンクス", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [106, 114, 189, 0, 0,0], "lvDefault": 70, "strDefault": 40, "intDefault": 48, "vitDefault": 45, "agiDefault": 48, "lucDefault": 44, "showDefault":true },
  "119":{  "attr":[1,2,1,1,2,1,1,1],"id": 119, "genusID":14,"name": "スレイプニル", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [108, 124, 402, 0, 0,0], "lvDefault": 56, "strDefault": 33, "intDefault": 33, "vitDefault": 33, "agiDefault": 46, "lucDefault": 38, "showDefault":true },
  "120":{  "attr":[1,2,1,1,6,2,4,1],"id": 120, "genusID":14,"name": "ビャッコ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [21, 386, 0, 0, 0,0], "lvDefault": 48, "strDefault": 33, "intDefault": 27, "vitDefault": 29, "agiDefault": 39, "lucDefault": 31, "showDefault":true },
  "121":{  "attr":[1,1,2,3,3,1,4,2],"id": 121, "genusID":14,"name": "アイラーヴァタ", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [102, 111, 189, 0, 0,0], "lvDefault": 41, "strDefault": 30, "intDefault": 24, "vitDefault": 25, "agiDefault": 29, "lucDefault": 30, "showDefault":true },
  "122":{  "attr":[1,1,1,1,1,1,4,1],"id": 122, "genusID":14,"name": "セイギュウカイ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [130, 154, 155, 0, 0,0], "lvDefault": 33, "strDefault": 25, "intDefault": 19, "vitDefault": 22, "agiDefault": 26, "lucDefault": 22, "showDefault":true },
  "123":{  "attr":[1,1,1,1,2,3,1,1],"id": 123, "genusID":14,"name": "パピルサグ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [110, 181, 188, 0, 0,0], "lvDefault": 26, "strDefault": 18, "intDefault": 20, "vitDefault": 16, "agiDefault": 21, "lucDefault": 18, "showDefault":true },
  "124":{  "attr":[1,1,1,1,1,1,3,2],"id": 124, "genusID":14,"name": "アピス", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [58, 130, 377, 0, 0,0], "lvDefault": 18, "strDefault": 13, "intDefault": 16, "vitDefault": 14, "agiDefault": 14, "lucDefault": 12, "showDefault":true },
  "125":{  "attr":[1,1,1,3,3,2,1,1],"id": 125, "genusID":14,"name": "ヘケト", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [19, 101, 110, 0, 0,0], "lvDefault": 10, "strDefault": 6, "intDefault": 9, "vitDefault": 10, "agiDefault": 10, "lucDefault": 10, "showDefault":true },
  "126":{  "attr":[0,0,0,0,0,0,0,0],"id": 126, "genusID":14,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "127":{  "attr":[0,0,0,0,0,0,0,0],"id": 127, "genusID":14,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "128":{  "attr":[1,1,2,3,1,1,4,3],"id": 128, "genusID":15,"name": "ヘイムダル", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [44, 51, 142, 0, 0,0], "lvDefault": 72, "strDefault": 41, "intDefault": 51, "vitDefault": 43, "agiDefault": 51, "lucDefault": 45, "showDefault":true },
  "129":{  "attr":[3,1,1,1,1,2,4,3],"id": 129, "genusID":15,"name": "ハヌマーン", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [159, 389, 392, 0, 0,0], "lvDefault": 62, "strDefault": 45, "intDefault": 33, "vitDefault": 37, "agiDefault": 44, "lucDefault": 42, "showDefault":true },
  "130":{  "attr":[3,1,1,1,2,4,3,1],"id": 130, "genusID":15,"name": "クー・フーリン", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [36, 143, 182, 0, 0,0], "lvDefault": 48, "strDefault": 36, "intDefault": 32, "vitDefault": 34, "agiDefault": 36, "lucDefault": 26, "showDefault":true },
  "131":{  "attr":[1,4,1,1,1,5,4,1],"id": 131, "genusID":15,"name": "クラマテング", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [32, 60, 387, 0, 0,0], "lvDefault": 38, "strDefault": 25, "intDefault": 26, "vitDefault": 27, "agiDefault": 31, "lucDefault": 25, "showDefault":true },
  "132":{  "attr":[1,1,3,2,3,1,1,3],"id": 132, "genusID":15,"name": "トラロック", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [5, 20, 0, 0, 0,0], "lvDefault": 40, "strDefault": 25, "intDefault": 32, "vitDefault": 23, "agiDefault": 28, "lucDefault": 27, "showDefault":true },
  "133":{  "attr":[1,1,5,5,1,1,4,1],"id": 133, "genusID":15,"name": "フロストエース", "devilCost": 30, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [12, 152, 383, 0, 0,0], "lvDefault": 34, "strDefault": 27, "intDefault": 25, "vitDefault": 25, "agiDefault": 25, "lucDefault": 22, "showDefault":true },
  "134":{  "attr":[3,3,1,1,1,1,1,2],"id": 134, "genusID":15,"name": "タム・リン", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [112, 160, 190, 0, 0,0], "lvDefault": 29, "strDefault": 22, "intDefault": 17, "vitDefault": 20, "agiDefault": 24, "lucDefault": 19, "showDefault":true },
  "135":{  "attr":[3,1,1,1,1,1,4,1],"id": 135, "genusID":15,"name": "クルースニク", "devilCost": 18, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [59, 186, 394, 0, 0,0], "lvDefault": 55, "strDefault": 40, "intDefault": 38, "vitDefault": 37, "agiDefault": 37, "lucDefault": 33, "showDefault":true },
  "136":{  "attr":[3,3,3,1,1,1,1,1],"id": 136, "genusID":16,"name": "デモニホ", "devilCost": 12, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [340, 341, 342, 0, 0,0], "lvDefault": 75, "strDefault": 52, "intDefault": 41, "vitDefault": 53, "agiDefault": 44, "lucDefault": 45, "showDefault":true },
  "137":{  "attr":[1,2,3,3,3,3,1,1],"id": 137, "genusID":16,"name": "ティターニア", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [24, 106, 0, 0, 0,0], "lvDefault": 60, "strDefault": 32, "intDefault": 47, "vitDefault": 30, "agiDefault": 40, "lucDefault": 41, "showDefault":true },
  "138":{  "attr":[1,1,1,1,2,3,3,3],"id": 138, "genusID":16,"name": "オベロン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [30, 103, 0, 0, 0,0], "lvDefault": 50, "strDefault": 28, "intDefault": 36, "vitDefault": 29, "agiDefault": 34, "lucDefault": 33, "showDefault":true },
  "139":{  "attr":[1,1,1,3,1,1,3,3],"id": 139, "genusID":16,"name": "ヴィヴィアン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [14, 70, 396, 0, 0,0], "lvDefault": 40, "strDefault": 26, "intDefault": 27, "vitDefault": 25, "agiDefault": 23, "lucDefault": 29, "showDefault":true },
  "140":{  "attr":[3,1,1,1,3,1,2,2],"id": 140, "genusID":16,"name": "スプリガン", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [25, 125, 152, 0, 0,0], "lvDefault": 34, "strDefault": 25, "intDefault": 18, "vitDefault": 26, "agiDefault": 20, "lucDefault": 23, "showDefault":true },
  "141":{  "attr":[1,1,2,3,1,1,1,1],"id": 141, "genusID":16,"name": "シルキー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 102, 114, 0, 0,0], "lvDefault": 23, "strDefault": 14, "intDefault": 20, "vitDefault": 13, "agiDefault": 15, "lucDefault": 17, "showDefault":true },
  "142":{  "attr":[1,1,5,2,1,1,1,1],"id": 142, "genusID":16,"name": "ジャックランタン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 4, 0, 0, 0,0], "lvDefault": 16, "strDefault": 9, "intDefault": 15, "vitDefault": 8, "agiDefault": 11, "lucDefault": 15, "showDefault":true },
  "143":{  "attr":[1,1,3,3,3,1,1,1],"id": 143, "genusID":16,"name": "ハイピクシー", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 104, 189, 0, 0,0], "lvDefault": 19, "strDefault": 10, "intDefault": 17, "vitDefault": 10, "agiDefault": 18, "lucDefault": 17, "showDefault":true },
  "144":{  "attr":[1,1,2,5,1,1,1,1],"id": 144, "genusID":16,"name": "ジャックフロスト", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [10, 13, 170, 0, 0,0], "lvDefault": 12, "strDefault": 5, "intDefault": 12, "vitDefault": 6, "agiDefault": 11, "lucDefault": 12, "showDefault":true },
  "145":{  "attr":[1,1,1,1,2,1,1,1],"id": 145, "genusID":16,"name": "ゴブリン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [121, 173, 0, 0, 0,0], "lvDefault": 7, "strDefault": 8, "intDefault": 3, "vitDefault": 7, "agiDefault": 4, "lucDefault": 9, "showDefault":true },
  "146":{  "attr":[1,1,3,1,1,1,1,1],"id": 146, "genusID":16,"name": "ピクシー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 101, 0, 0, 0,0], "lvDefault": 2, "strDefault": 2, "intDefault": 3, "vitDefault": 3, "agiDefault": 3, "lucDefault": 5, "showDefault":true },
  "147":{  "attr":[1,1,2,3,1,1,3,3],"id": 147, "genusID":16,"name": "ローレライ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [69, 104, 0, 0, 0,0], "lvDefault": 31, "strDefault": 19, "intDefault": 28, "vitDefault": 19, "agiDefault": 22, "lucDefault": 20, "showDefault":true },
  "148":{  "attr":[0,0,0,0,0,0,0,0],"id": 148, "genusID":16,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "149":{  "attr":[1,1,5,2,1,1,1,4],"id": 149, "genusID":17,"name": "ケルベロス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [3, 165, 392, 0, 0,0], "lvDefault": 66, "strDefault": 45, "intDefault": 37, "vitDefault": 40, "agiDefault": 44, "lucDefault": 42, "showDefault":true },
  "150":{  "attr":[1,1,1,2,1,1,4,4],"id": 150, "genusID":17,"name": "アーマーン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [133, 153, 0, 0, 0,0], "lvDefault": 56, "strDefault": 40, "intDefault": 38, "vitDefault": 37, "agiDefault": 31, "lucDefault": 32, "showDefault":true },
  "151":{  "attr":[1,2,3,3,3,3,1,1],"id": 151, "genusID":17,"name": "グリフォン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [108, 164, 167, 0, 0,0], "lvDefault": 46, "strDefault": 29, "intDefault": 26, "vitDefault": 31, "agiDefault": 36, "lucDefault": 26, "showDefault":true },
  "152":{  "attr":[1,1,6,2,1,1,1,1],"id": 152, "genusID":17,"name": "オルトロス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [7, 164, 381, 0, 0,0], "lvDefault": 36, "strDefault": 27, "intDefault": 22, "vitDefault": 21, "agiDefault": 25, "lucDefault": 23, "showDefault":true },
  "153":{  "attr":[1,1,2,1,1,1,1,1],"id": 153, "genusID":17,"name": "ショウジョウ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [174, 178, 393, 0, 0,0], "lvDefault": 30, "strDefault": 23, "intDefault": 17, "vitDefault": 18, "agiDefault": 22, "lucDefault": 20, "showDefault":true },
  "154":{  "attr":[1,1,3,2,3,1,1,3],"id": 154, "genusID":17,"name": "ネコマタ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [2, 164, 392, 0, 0,0], "lvDefault": 22, "strDefault": 17, "intDefault": 10, "vitDefault": 16, "agiDefault": 19, "lucDefault": 14, "showDefault":true },
  "155":{  "attr":[1,1,1,1,1,2,1,4],"id": 155, "genusID":17,"name": "イヌガミ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [128, 151, 398, 0, 0,0], "lvDefault": 17, "strDefault": 10, "intDefault": 11, "vitDefault": 12, "agiDefault": 15, "lucDefault": 13, "showDefault":true },
  "156":{  "attr":[1,1,1,1,1,1,2,4],"id": 156, "genusID":17,"name": "カタキラウワ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [53, 101, 0, 0, 0,0], "lvDefault": 9, "strDefault": 6, "intDefault": 10, "vitDefault": 10, "agiDefault": 4, "lucDefault": 7, "showDefault":true },
  "157":{  "attr":[1,1,3,2,1,1,1,1],"id": 157, "genusID":17,"name": "カソ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 0, 0, 0, 0,0], "lvDefault": 4, "strDefault": 6, "intDefault": 3, "vitDefault": 4, "agiDefault": 3, "lucDefault": 6, "showDefault":true },
  "158":{  "attr":[0,0,0,0,0,0,0,0],"id": 158, "genusID":17,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "159":{  "attr":[0,0,0,0,0,0,0,0],"id": 159, "genusID":17,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "160":{  "attr":[3,1,2,5,6,2,1,2],"id": 160, "genusID":18,"name": "ゴグマゴグ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [25, 128, 391, 0, 0,0], "lvDefault": 55, "strDefault": 39, "intDefault": 31, "vitDefault": 35, "agiDefault": 32, "lucDefault": 38, "showDefault":true },
  "161":{  "attr":[3,1,3,2,1,1,1,1],"id": 161, "genusID":18,"name": "トラルテクトリ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [111, 161, 170, 0, 0,0], "lvDefault": 45, "strDefault": 32, "intDefault": 23, "vitDefault": 32, "agiDefault": 24, "lucDefault": 34, "showDefault":true },
  "162":{  "attr":[3,3,1,1,1,1,1,1],"id": 162, "genusID":18,"name": "ティターン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [123, 142, 155, 0, 0,0], "lvDefault": 35, "strDefault": 24, "intDefault": 19, "vitDefault": 30, "agiDefault": 19, "lucDefault": 23, "showDefault":true },
  "163":{  "attr":[1,1,1,1,2,2,3,4],"id": 163, "genusID":18,"name": "カワンチャ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [66, 110, 111, 0, 0,0], "lvDefault": 25, "strDefault": 17, "intDefault": 17, "vitDefault": 17, "agiDefault": 17, "lucDefault": 17, "showDefault":true },
  "164":{  "attr":[1,1,2,1,1,1,1,1],"id": 164, "genusID":18,"name": "スダマ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [13, 75, 0, 0, 0,0], "lvDefault": 15, "strDefault": 8, "intDefault": 8, "vitDefault": 9, "agiDefault": 15, "lucDefault": 15, "showDefault":true },
  "165":{  "attr":[3,3,1,1,1,1,2,1],"id": 165, "genusID":18,"name": "ドワーフ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [123, 136, 151, 0, 0,0], "lvDefault": 20, "strDefault": 17, "intDefault": 11, "vitDefault": 15, "agiDefault": 10, "lucDefault": 17, "showDefault":true },
  "166":{  "attr":[1,1,3,2,1,2,1,1],"id": 166, "genusID":18,"name": "カハク", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 4, 0, 0, 0,0], "lvDefault": 6, "strDefault": 3, "intDefault": 8, "vitDefault": 2, "agiDefault": 7, "lucDefault": 8, "showDefault":true },
  "167":{  "attr":[1,1,2,3,1,1,1,1],"id": 167, "genusID":18,"name": "ノッカー", "devilCost": 12, "baseHP": 100, "HP": 30, "baseMP": 100, "MP": 14, "skillDefault": [10, 0, 0, 0, 0,0], "lvDefault": 1, "strDefault": 2, "intDefault": 3, "vitDefault": 3, "agiDefault": 1, "lucDefault": 4, "showDefault":true },
  "168":{  "attr":[0,0,0,0,0,0,0,0],"id": 168, "genusID":18,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "169":{  "attr":[0,0,0,0,0,0,0,0],"id": 169, "genusID":18,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "170":{  "attr":[1,1,1,4,4,2,4,1],"id": 170, "genusID":19,"name": "アナンタ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [63, 117, 396, 0, 0,0], "lvDefault": 65, "strDefault": 45, "intDefault": 40, "vitDefault": 39, "agiDefault": 41, "lucDefault": 40, "showDefault":true },
  "171":{  "attr":[1,1,3,4,2,1,1,1],"id": 171, "genusID":19,"name": "ヤマタノオロチ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [12, 65, 133, 0, 0,0], "lvDefault": 60, "strDefault": 42, "intDefault": 39, "vitDefault": 36, "agiDefault": 37, "lucDefault": 36, "showDefault":true },
  "172":{  "attr":[1,1,4,3,1,1,4,1],"id": 172, "genusID":19,"name": "ゲンブ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [12, 360, 0, 0, 0,0], "lvDefault": 42, "strDefault": 30, "intDefault": 25, "vitDefault": 33, "agiDefault": 22, "lucDefault": 26, "showDefault":true },
  "173":{  "attr":[1,1,2,3,3,1,1,3],"id": 173, "genusID":19,"name": "ユルング", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [16, 102, 110, 0, 0,0], "lvDefault": 28, "strDefault": 17, "intDefault": 24, "vitDefault": 17, "agiDefault": 17, "lucDefault": 19, "showDefault":true },
  "174":{  "attr":[1,1,1,2,1,1,1,1],"id": 174, "genusID":19,"name": "ヴィーヴル", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [5, 179, 0, 0, 0,0], "lvDefault": 33, "strDefault": 19, "intDefault": 21, "vitDefault": 20, "agiDefault": 26, "lucDefault": 23, "showDefault":true },
  "175":{  "attr":[3,3,2,2,2,2,1,1],"id": 175, "genusID":19,"name": "ノズチ", "devilCost": 10, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [123, 155, 0, 0, 0,0], "lvDefault": 18, "strDefault": 17, "intDefault": 11, "vitDefault": 12, "agiDefault": 10, "lucDefault": 14, "showDefault":true },
  "176":{  "attr":[1,1,1,1,3,2,1,1],"id": 176, "genusID":19,"name": "ナーガ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [19, 151, 367, 0, 0,0], "lvDefault": 11, "strDefault": 11, "intDefault": 8, "vitDefault": 10, "agiDefault": 7, "lucDefault": 7, "showDefault":true },
  "177":{  "attr":[0,0,0,0,0,0,0,0],"id": 177, "genusID":19,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "178":{  "attr":[0,0,0,0,0,0,0,0],"id": 178, "genusID":19,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "179":{  "attr":[1,1,3,1,2,6,1,4],"id": 179, "genusID":20,"name": "モト", "devilCost": 23, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [33, 39, 374, 0, 0,0], "lvDefault": 87, "strDefault": 48, "intDefault": 62, "vitDefault": 50, "agiDefault": 55, "lucDefault": 56, "showDefault":true },
  "180":{  "attr":[1,1,3,2,1,1,4,4],"id": 180, "genusID":20,"name": "ネルガル", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [54, 59, 186, 0, 0,0], "lvDefault": 76, "strDefault": 50, "intDefault": 47, "vitDefault": 43, "agiDefault": 50, "lucDefault": 48, "showDefault":true },
  "181":{  "attr":[1,1,1,1,1,1,3,4],"id": 181, "genusID":20,"name": "ゲーデ", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [37, 54, 118, 0, 0,0], "lvDefault": 62, "strDefault": 37, "intDefault": 37, "vitDefault": 38, "agiDefault": 45, "lucDefault": 39, "showDefault":true },
  "182":{  "attr":[1,1,1,1,2,4,4,4],"id": 182, "genusID":20,"name": "ペルセポネー", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [33, 68, 112, 0, 0,0], "lvDefault": 58, "strDefault": 35, "intDefault": 39, "vitDefault": 37, "agiDefault": 40, "lucDefault": 33, "showDefault":true },
  "183":{  "attr":[1,1,2,4,2,1,3,4],"id": 183, "genusID":20,"name": "ヘル", "devilCost": 19, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [12, 56, 146, 0, 0,0], "lvDefault": 47, "strDefault": 26, "intDefault": 35, "vitDefault": 27, "agiDefault": 33, "lucDefault": 30, "showDefault":true },
  "184":{  "attr":[0,0,0,0,0,0,0,0],"id": 184, "genusID":20,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "185":{  "attr":[0,0,0,0,0,0,0,0],"id": 185, "genusID":20,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "186":{  "attr":[1,1,3,3,6,2,1,4],"id": 186, "genusID":21,"name": "フェンリル", "devilCost": 16, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [142, 156, 392, 0, 0,0], "lvDefault": 71, "strDefault": 51, "intDefault": 37, "vitDefault": 43, "agiDefault": 49, "lucDefault": 43, "showDefault":true },
  "187":{  "attr":[1,1,3,1,1,2,1,1],"id": 187, "genusID":21,"name": "カブラカン", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [105, 134, 155, 0, 0,0], "lvDefault": 64, "strDefault": 46, "intDefault": 37, "vitDefault": 42, "agiDefault": 38, "lucDefault": 39, "showDefault":true },
  "188":{  "attr":[3,1,1,1,1,1,2,1],"id": 188, "genusID":21,"name": "カトブレパス", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [72, 74, 0, 0, 0,0], "lvDefault": 52, "strDefault": 35, "intDefault": 38, "vitDefault": 33, "agiDefault": 27, "lucDefault": 33, "showDefault":true },
  "189":{  "attr":[1,1,1,1,3,2,1,3],"id": 189, "genusID":21,"name": "マンティコア", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [21, 110, 188, 0, 0,0], "lvDefault": 45, "strDefault": 31, "intDefault": 29, "vitDefault": 30, "agiDefault": 25, "lucDefault": 30, "showDefault":true },
  "190":{  "attr":[1,1,2,3,2,1,1,1],"id": 190, "genusID":21,"name": "ピアレイ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [102, 167, 0, 0, 0,0], "lvDefault": 40, "strDefault": 24, "intDefault": 27, "vitDefault": 29, "agiDefault": 23, "lucDefault": 27, "showDefault":true },
  "191":{  "attr":[1,2,1,1,3,2,1,1],"id": 191, "genusID":21,"name": "ヌエ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [25, 135, 0, 0, 0,0], "lvDefault": 27, "strDefault": 21, "intDefault": 18, "vitDefault": 18, "agiDefault": 18, "lucDefault": 16, "showDefault":true },
  "192":{  "attr":[1,1,1,1,6,2,1,4],"id": 192, "genusID":21,"name": "ライジュウ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [20, 22, 385, 0, 0,0], "lvDefault": 17, "strDefault": 11, "intDefault": 13, "vitDefault": 13, "agiDefault": 14, "lucDefault": 10, "showDefault":true },
  "193":{  "attr":[3,3,1,1,2,2,1,1],"id": 193, "genusID":21,"name": "カクエン", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [166, 175, 0, 0, 0,0], "lvDefault": 10, "strDefault": 7, "intDefault": 7, "vitDefault": 11, "agiDefault": 7, "lucDefault": 8, "showDefault":true },
  "194":{  "attr":[0,0,0,0,0,0,0,0],"id": 194, "genusID":21,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "195":{  "attr":[0,0,0,0,0,0,0,0],"id": 195, "genusID":21,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "196":{  "attr":[3,1,1,2,1,1,1,1],"id": 196, "genusID":22,"name": "ヘカトンケイル", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [123, 162, 175, 0, 0,0], "lvDefault": 70, "strDefault": 52, "intDefault": 37, "vitDefault": 50, "agiDefault": 37, "lucDefault": 44, "showDefault":true },
  "197":{  "attr":[5,6,2,2,2,2,2,4],"id": 197, "genusID":22,"name": "ギリメカラ", "devilCost": 13, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [66, 156, 0, 0, 0,0], "lvDefault": 57, "strDefault": 40, "intDefault": 39, "vitDefault": 31, "agiDefault": 34, "lucDefault": 37, "showDefault":true },
  "198":{  "attr":[3,3,1,1,1,1,2,1],"id": 198, "genusID":22,"name": "グレンデル", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [154, 173, 355, 0, 0,0], "lvDefault": 46, "strDefault": 36, "intDefault": 29, "vitDefault": 31, "agiDefault": 24, "lucDefault": 28, "showDefault":true },
  "199":{  "attr":[3,1,5,6,1,1,1,4],"id": 199, "genusID":22,"name": "じゃあくフロスト", "devilCost": 22, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [12, 56, 389, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 23, "vitDefault": 20, "agiDefault": 23, "lucDefault": 17, "showDefault":true },
  "200":{  "attr":[1,3,1,2,1,1,3,3],"id": 200, "genusID":22,"name": "ラクシャーサ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [2, 157, 160, 0, 0,0], "lvDefault": 35, "strDefault": 28, "intDefault": 23, "vitDefault": 23, "agiDefault": 20, "lucDefault": 21, "showDefault":true },
  "201":{  "attr":[1,1,2,4,2,3,1,1],"id": 201, "genusID":22,"name": "ウェンディゴ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 73, 171, 0, 0,0], "lvDefault": 23, "strDefault": 21, "intDefault": 16, "vitDefault": 16, "agiDefault": 12, "lucDefault": 14, "showDefault":true },
  "202":{  "attr":[1,1,1,3,3,2,2,1],"id": 202, "genusID":22,"name": "イッポンダタラ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [142, 152, 0, 0, 0,0], "lvDefault": 10, "strDefault": 11, "intDefault": 7, "vitDefault": 9, "agiDefault": 6, "lucDefault": 7, "showDefault":true },
  "203":{  "attr":[1,1,2,1,3,2,1,1],"id": 203, "genusID":22,"name": "グレムリン", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [13, 122, 0, 0, 0,0], "lvDefault": 5, "strDefault": 6, "intDefault": 4, "vitDefault": 3, "agiDefault": 8, "lucDefault": 4, "showDefault":true },
  "204":{  "attr":[0,0,0,0,0,0,0,0],"id": 204, "genusID":22,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "205":{  "attr":[0,0,0,0,0,0,0,0],"id": 205, "genusID":22,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "206":{  "attr":[1,4,2,1,1,1,1,1],"id": 206, "genusID":23,"name": "アルケニー", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [68, 185, 0, 0, 0,0], "lvDefault": 39, "strDefault": 29, "intDefault": 21, "vitDefault": 25, "agiDefault": 30, "lucDefault": 22, "showDefault":true },
  "207":{  "attr":[1,2,1,1,3,2,1,4],"id": 207, "genusID":23,"name": "モスマン", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [54, 71, 122, 0, 0,0], "lvDefault": 29, "strDefault": 19, "intDefault": 22, "vitDefault": 16, "agiDefault": 23, "lucDefault": 17, "showDefault":true },
  "208":{  "attr":[1,1,1,2,1,1,1,1],"id": 208, "genusID":23,"name": "ミルメコレオ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [115, 191, 0, 0, 0,0], "lvDefault": 22, "strDefault": 19, "intDefault": 12, "vitDefault": 15, "agiDefault": 14, "lucDefault": 16, "showDefault":true },
  "209":{  "attr":[1,1,1,1,2,1,1,1],"id": 209, "genusID":23,"name": "オキクムシ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [53, 180, 0, 0, 0,0], "lvDefault": 3, "strDefault": 4, "intDefault": 6, "vitDefault": 2, "agiDefault": 3, "lucDefault": 4, "showDefault":true },
  "210":{  "attr":[1,1,1,1,2,1,2,1],"id": 210, "genusID":23,"name": "ウブ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [53, 101, 180, 0, 0,0], "lvDefault": 11, "strDefault": 6, "intDefault": 11, "vitDefault": 10, "agiDefault": 9, "lucDefault": 7, "showDefault":true },
  "211":{  "attr":[0,0,0,0,0,0,0,0],"id": 211, "genusID":23,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "212":{  "attr":[0,0,0,0,0,0,0,0],"id": 212, "genusID":23,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "213":{  "attr":[6,1,6,1,6,1,4,4],"id": 213, "genusID":24,"name": "シヴァ", "devilCost": 23, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [41, 390, 395, 0, 0,0], "lvDefault": 91, "strDefault": 65, "intDefault": 60, "vitDefault": 58, "agiDefault": 56, "lucDefault": 54, "showDefault":true },
  "214":{  "attr":[3,1,1,1,1,5,4,4],"id": 214, "genusID":24,"name": "スサノオ", "devilCost": 22, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [35, 45, 162, 0, 0,0], "lvDefault": 85, "strDefault": 60, "intDefault": 50, "vitDefault": 53, "agiDefault": 53, "lucDefault": 54, "showDefault":true },
  "215":{  "attr":[4,1,1,1,1,1,4,3],"id": 215, "genusID":24,"name": "カルティケーヤ", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [124, 142, 186, 0, 0,0], "lvDefault": 70, "strDefault": 45, "intDefault": 41, "vitDefault": 41, "agiDefault": 55, "lucDefault": 43, "showDefault":true },
  "216":{  "attr":[4,4,3,2,2,1,4,1],"id": 216, "genusID":24,"name": "セイテンタイセイ", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [136, 153, 352, 0, 0,0], "lvDefault": 58, "strDefault": 42, "intDefault": 37, "vitDefault": 35, "agiDefault": 40, "lucDefault": 35, "showDefault":true },
  "217":{  "attr":[1,1,5,2,1,1,3,3],"id": 217, "genusID":24,"name": "トナティウ", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [6, 162, 361, 0, 0,0], "lvDefault": 45, "strDefault": 35, "intDefault": 26, "vitDefault": 30, "agiDefault": 28, "lucDefault": 31, "showDefault":true },
  "218":{  "attr":[3,3,1,1,1,1,4,1],"id": 218, "genusID":24,"name": "アレス", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [158, 351, 391, 0, 0,0], "lvDefault": 36, "strDefault": 29, "intDefault": 22, "vitDefault": 29, "agiDefault": 21, "lucDefault": 22, "showDefault":true },
  "219":{  "attr":[0,0,0,0,0,0,0,0],"id": 219, "genusID":24,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "220":{  "attr":[0,0,0,0,0,0,0,0],"id": 220, "genusID":24,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "221":{  "attr":[1,1,1,1,1,1,4,4],"id": 221, "genusID":25,"name": "セイオウボ", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [140, 147, 192, 0, 0,0], "lvDefault": 79, "strDefault": 50, "intDefault": 54, "vitDefault": 51, "agiDefault": 46, "lucDefault": 51, "showDefault":true },
  "222":{  "attr":[1,1,2,6,1,1,1,1],"id": 222, "genusID":25,"name": "スカディ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [15, 152, 383, 0, 0,0], "lvDefault": 73, "strDefault": 52, "intDefault": 41, "vitDefault": 46, "agiDefault": 51, "lucDefault": 44, "showDefault":true },
  "223":{  "attr":[1,1,1,1,4,2,4,3],"id": 223, "genusID":25,"name": "ブラックマリア", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [21, 64, 106, 0, 0,0], "lvDefault": 64, "strDefault": 39, "intDefault": 47, "vitDefault": 40, "agiDefault": 41, "lucDefault": 40, "showDefault":true },
  "224":{  "attr":[1,4,1,1,1,1,3,3],"id": 224, "genusID":25,"name": "ダイアナ", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [69, 118, 185, 0, 0,0], "lvDefault": 54, "strDefault": 33, "intDefault": 34, "vitDefault": 35, "agiDefault": 40, "lucDefault": 35, "showDefault":true },
  "225":{  "attr":[1,1,1,1,1,1,3,3],"id": 225, "genusID":25,"name": "ハリティー", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [50, 64, 102, 0, 0,0], "lvDefault": 44, "strDefault": 33, "intDefault": 28, "vitDefault": 29, "agiDefault": 27, "lucDefault": 30, "showDefault":true },
  "226":{  "attr":[1,1,2,3,1,1,2,4],"id": 226, "genusID":25,"name": "セドナ", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [14, 53, 114, 0, 0,0], "lvDefault": 34, "strDefault": 22, "intDefault": 27, "vitDefault": 21, "agiDefault": 21, "lucDefault": 26, "showDefault":true },
  "227":{  "attr":[1,1,3,2,1,3,1,3],"id": 227, "genusID":25,"name": "ズェラロンズ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [7, 55, 359, 0, 0,0], "lvDefault": 21, "strDefault": 13, "intDefault": 14, "vitDefault": 18, "agiDefault": 15, "lucDefault": 18, "showDefault":true },
  "228":{  "attr":[1,1,4,2,2,1,1,1],"id": 228, "genusID":25,"name": "ペレ", "devilCost": 14, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [4, 69, 115, 0, 0,0], "lvDefault": 10, "strDefault": 7, "intDefault": 13, "vitDefault": 8, "agiDefault": 7, "lucDefault": 10, "showDefault":true },
  "229":{  "attr":[0,0,0,0,0,0,0,0],"id": 229, "genusID":25,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "230":{  "attr":[0,0,0,0,0,0,0,0],"id": 230, "genusID":25,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "231":{  "attr":[3,3,3,3,3,3,4,4],"id": 231, "genusID":26,"name": "コウリュウ", "devilCost": 34, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [39, 61, 395, 0, 0,0], "lvDefault": 78, "strDefault": 50, "intDefault": 54, "vitDefault": 50, "agiDefault": 52, "lucDefault": 48, "showDefault":true },
  "232":{  "attr":[5,3,3,2,3,2,4,1],"id": 232, "genusID":26,"name": "ケツアルカトル", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [8, 107, 123, 0, 0,0], "lvDefault": 69, "strDefault": 49, "intDefault": 42, "vitDefault": 45, "agiDefault": 45, "lucDefault": 41, "showDefault":true },
  "233":{  "attr":[1,3,1,1,1,1,1,4],"id": 233, "genusID":26,"name": "ショクイン", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [131, 379, 398, 0, 0,0], "lvDefault": 58, "strDefault": 41, "intDefault": 34, "vitDefault": 39, "agiDefault": 38, "lucDefault": 37, "showDefault":true },
  "234":{  "attr":[1,3,3,3,2,6,4,1],"id": 234, "genusID":26,"name": "セイリュウ", "devilCost": 16, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [30, 372, 0, 0, 0,0], "lvDefault": 45, "strDefault": 33, "intDefault": 24, "vitDefault": 32, "agiDefault": 31, "lucDefault": 30, "showDefault":true },
  "235":{  "attr":[1,3,6,4,2,3,1,2],"id": 235, "genusID":26,"name": "グクマッツ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [37, 126, 0, 0, 0,0], "lvDefault": 35, "strDefault": 21, "intDefault": 27, "vitDefault": 23, "agiDefault": 26, "lucDefault": 23, "showDefault":true },
  "236":{  "attr":[1,3,2,1,4,3,1,1],"id": 236, "genusID":26,"name": "パトリムパス", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [23, 34, 118, 0, 0,0], "lvDefault": 24, "strDefault": 16, "intDefault": 22, "vitDefault": 17, "agiDefault": 18, "lucDefault": 14, "showDefault":true },
  "237":{  "attr":[1,3,4,6,1,1,2,2],"id": 237, "genusID":26,"name": "マカラ", "devilCost": 15, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [16, 102, 363, 0, 0,0], "lvDefault": 13, "strDefault": 8, "intDefault": 12, "vitDefault": 11, "agiDefault": 15, "lucDefault": 8, "showDefault":true },
  "238":{  "attr":[0,0,0,0,0,0,0,0],"id": 238, "genusID":26,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "239":{  "attr":[0,0,0,0,0,0,0,0],"id": 239, "genusID":26,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "240":{  "attr":[3,1,6,1,6,1,3,3],"id": 240, "genusID":27,"name": "トール", "devilCost": 19, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [21, 153, 386, 0, 0,0], "lvDefault": 76, "strDefault": 55, "intDefault": 45, "vitDefault": 53, "agiDefault": 41, "lucDefault": 49, "showDefault":true },
  "241":{  "attr":[3,1,1,4,1,1,3,3],"id": 241, "genusID":27,"name": "ビシャモンテン", "devilCost": 21, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [17, 162, 384, 0, 0,0], "lvDefault": 65, "strDefault": 44, "intDefault": 43, "vitDefault": 47, "agiDefault": 39, "lucDefault": 42, "showDefault":true },
  "242":{  "attr":[3,1,1,1,2,5,3,3],"id": 242, "genusID":27,"name": "ジコクテン", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [30, 159, 388, 0, 0,0], "lvDefault": 57, "strDefault": 42, "intDefault": 36, "vitDefault": 35, "agiDefault": 39, "lucDefault": 39, "showDefault":true },
  "243":{  "attr":[3,1,1,1,5,2,3,3],"id": 243, "genusID":27,"name": "コウモクテン", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [20, 158, 368, 0, 0,0], "lvDefault": 47, "strDefault": 37, "intDefault": 32, "vitDefault": 32, "agiDefault": 31, "lucDefault": 29, "showDefault":true },
  "244":{  "attr":[3,1,5,2,1,1,3,3],"id": 244, "genusID":27,"name": "ゾウチョウテン", "devilCost": 20, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [2, 161, 360, 0, 0,0], "lvDefault": 37, "strDefault": 32, "intDefault": 23, "vitDefault": 25, "agiDefault": 27, "lucDefault": 24, "showDefault":true },
  "245":{  "attr":[3,1,1,3,2,3,3,3],"id": 245, "genusID":27,"name": "タケミナカタ", "devilCost": 17, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [29, 175, 402, 0, 0,0], "lvDefault": 27, "strDefault": 23, "intDefault": 20, "vitDefault": 20, "agiDefault": 15, "lucDefault": 18, "showDefault":true },
  "246":{  "attr":[0,0,0,0,0,0,0,0],"id": 246, "genusID":27,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "247":{  "attr":[0,0,0,0,0,0,0,0],"id": 247, "genusID":27,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "248":{  "attr":[1,1,1,1,1,1,3,4],"id": 248, "genusID":28,"name": "ゴモリー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [64, 109, 401, 0, 0,0], "lvDefault": 60, "strDefault": 36, "intDefault": 41, "vitDefault": 34, "agiDefault": 39, "lucDefault": 40, "showDefault":true },
  "249":{  "attr":[1,2,1,1,1,1,1,4],"id": 249, "genusID":28,"name": "デカラビア", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [37, 139, 0, 0, 0,0], "lvDefault": 50, "strDefault": 29, "intDefault": 36, "vitDefault": 33, "agiDefault": 29, "lucDefault": 33, "showDefault":true },
  "250":{  "attr":[1,1,1,1,1,1,3,4],"id": 250, "genusID":28,"name": "オセ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [130, 159, 176, 0, 0,0], "lvDefault": 41, "strDefault": 32, "intDefault": 25, "vitDefault": 22, "agiDefault": 32, "lucDefault": 22, "showDefault":true },
  "251":{  "attr":[2,1,3,3,2,4,3,4],"id": 251, "genusID":28,"name": "ダンタリアン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [32, 139, 143, 0, 0,0], "lvDefault": 33, "strDefault": 17, "intDefault": 27, "vitDefault": 20, "agiDefault": 22, "lucDefault": 23, "showDefault":true },
  "252":{  "attr":[1,1,2,1,1,1,3,3],"id": 252, "genusID":28,"name": "オリアス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [32, 67, 128, 0, 0,0], "lvDefault": 27, "strDefault": 16, "intDefault": 18, "vitDefault": 18, "agiDefault": 21, "lucDefault": 18, "showDefault":true },
  "253":{  "attr":[1,2,1,1,1,1,3,3],"id": 253, "genusID":28,"name": "ハルパス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [121, 123, 160, 0, 0,0], "lvDefault": 22, "strDefault": 14, "intDefault": 14, "vitDefault": 13, "agiDefault": 19, "lucDefault": 16, "showDefault":true },
  "254":{  "attr":[1,1,1,2,1,1,2,3],"id": 254, "genusID":28,"name": "ビフロンス", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [4, 0, 0, 0, 0,0], "lvDefault": 16, "strDefault": 10, "intDefault": 14, "vitDefault": 10, "agiDefault": 13, "lucDefault": 11, "showDefault":true },
  "255":{  "attr":[1,1,5,1,2,1,1,1],"id": 255, "genusID":28,"name": "メルコム", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [4, 0, 0, 0, 0,0], "lvDefault": 7, "strDefault": 4, "intDefault": 10, "vitDefault": 6, "agiDefault": 6, "lucDefault": 5, "showDefault":true },
  "256":{  "attr":[0,0,0,0,0,0,0,0],"id": 256, "genusID":28,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "257":{  "attr":[0,0,0,0,0,0,0,0],"id": 257, "genusID":28,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "258":{  "attr":[3,5,1,3,3,3,2,4],"id": 258, "genusID":29,"name": "オンギュウキ", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [146, 159, 357, 0, 0,0], "lvDefault": 66, "strDefault": 47, "intDefault": 41, "vitDefault": 39, "agiDefault": 47, "lucDefault": 39, "showDefault":true },
  "259":{  "attr":[3,1,2,3,1,1,1,1],"id": 259, "genusID":29,"name": "ベルセルク", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [121, 171, 174, 0, 0,0], "lvDefault": 53, "strDefault": 39, "intDefault": 32, "vitDefault": 27, "agiDefault": 37, "lucDefault": 34, "showDefault":true },
  "260":{  "attr":[1,1,1,1,2,5,1,4],"id": 260, "genusID":29,"name": "フウキ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [30, 133, 161, 0, 0,0], "lvDefault": 36, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 28, "lucDefault": 24, "showDefault":true },
  "261":{  "attr":[1,1,2,4,1,1,1,4],"id": 261, "genusID":29,"name": "スイキ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 158, 391, 0, 0,0], "lvDefault": 41, "strDefault": 30, "intDefault": 30, "vitDefault": 24, "agiDefault": 25, "lucDefault": 24, "showDefault":true },
  "262":{  "attr":[3,1,1,1,4,2,1,4],"id": 262, "genusID":29,"name": "キンキ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [20, 169, 391, 0, 0,0], "lvDefault": 32, "strDefault": 22, "intDefault": 18, "vitDefault": 27, "agiDefault": 19, "lucDefault": 20, "showDefault":true },
  "263":{  "attr":[3,3,1,1,1,1,1,1],"id": 263, "genusID":29,"name": "モムノフ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [142, 158, 0, 0, 0,0], "lvDefault": 19, "strDefault": 15, "intDefault": 10, "vitDefault": 18, "agiDefault": 11, "lucDefault": 13, "showDefault":true },
  "264":{  "attr":[1,1,1,1,1,1,2,2],"id": 264, "genusID":29,"name": "ヤマワロ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [28, 73, 154, 0, 0,0], "lvDefault": 24, "strDefault": 21, "intDefault": 13, "vitDefault": 17, "agiDefault": 16, "lucDefault": 15, "showDefault":true },
  "265":{  "attr":[3,1,2,1,2,1,1,1],"id": 265, "genusID":29,"name": "アズミ", "devilCost": 11, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [154, 0, 0, 0, 0,0], "lvDefault": 12, "strDefault": 10, "intDefault": 8, "vitDefault": 8, "agiDefault": 12, "lucDefault": 8, "showDefault":true },
  "266":{  "attr":[3,1,1,1,2,1,1,1],"id": 266, "genusID":29,"name": "オニ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [154, 169, 0, 0, 0,0], "lvDefault": 8, "strDefault": 10, "intDefault": 6, "vitDefault": 7, "agiDefault": 4, "lucDefault": 7, "showDefault":true },
  "267":{  "attr":[0,0,0,0,0,0,0,0],"id": 267, "genusID":29,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "268":{  "attr":[0,0,0,0,0,0,0,0],"id": 268, "genusID":29,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "269":{  "attr":[5,5,1,1,2,1,1,1],"id": 269, "genusID":30,"name": "ランダ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [33, 129, 178, 0, 0,0], "lvDefault": 68, "strDefault": 42, "intDefault": 49, "vitDefault": 39, "agiDefault": 40, "lucDefault": 44, "showDefault":true },
  "270":{  "attr":[1,1,3,2,1,1,3,3],"id": 270, "genusID":30,"name": "ダーキニー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [3, 55, 70, 0, 0,0], "lvDefault": 63, "strDefault": 44, "intDefault": 39, "vitDefault": 39, "agiDefault": 38, "lucDefault": 39, "showDefault":true },
  "271":{  "attr":[1,1,3,3,2,3,4,4],"id": 271, "genusID":30,"name": "アトロポス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [52, 54, 59, 0, 0,0], "lvDefault": 49, "strDefault": 27, "intDefault": 36, "vitDefault": 31, "agiDefault": 31, "lucDefault": 32, "showDefault":true },
  "272":{  "attr":[1,1,2,3,3,3,1,1],"id": 272, "genusID":30,"name": "ラケシス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [75, 121, 123, 0, 0,0], "lvDefault": 43, "strDefault": 24, "intDefault": 32, "vitDefault": 28, "agiDefault": 27, "lucDefault": 28, "showDefault":true },
  "273":{  "attr":[1,1,3,3,3,2,1,1],"id": 273, "genusID":30,"name": "クロト", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [103, 118, 187, 0, 0,0], "lvDefault": 37, "strDefault": 21, "intDefault": 28, "vitDefault": 23, "agiDefault": 25, "lucDefault": 24, "showDefault":true },
  "274":{  "attr":[1,1,2,6,1,1,1,1],"id": 274, "genusID":30,"name": "ユキジョロウ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [14, 52, 63, 0, 0,0], "lvDefault": 26, "strDefault": 15, "intDefault": 21, "vitDefault": 17, "agiDefault": 18, "lucDefault": 17, "showDefault":true },
  "275":{  "attr":[1,1,1,1,3,1,1,1],"id": 275, "genusID":30,"name": "リャナンシー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [69, 104, 108, 0, 0,0], "lvDefault": 14, "strDefault": 7, "intDefault": 14, "vitDefault": 9, "agiDefault": 9, "lucDefault": 13, "showDefault":true },
  "276":{  "attr":[1,1,2,1,1,1,1,3],"id": 276, "genusID":30,"name": "アチェリ", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [48, 110, 179, 0, 0,0], "lvDefault": 8, "strDefault": 6, "intDefault": 7, "vitDefault": 5, "agiDefault": 9, "lucDefault": 7, "showDefault":true },
  "277":{  "attr":[0,0,0,0,0,0,0,0],"id": 277, "genusID":30,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "278":{  "attr":[0,0,0,0,0,0,0,0],"id": 278, "genusID":30,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "279":{  "attr":[1,2,3,3,6,3,1,3],"id": 279, "genusID":31,"name": "リリス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [27, 49, 69, 0, 0,0], "lvDefault": 66, "strDefault": 38, "intDefault": 46, "vitDefault": 39, "agiDefault": 42, "lucDefault": 43, "showDefault":true },
  "280":{  "attr":[1,1,1,1,1,1,2,4],"id": 280, "genusID":31,"name": "ワイルド・ハント", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [55, 175, 393, 0, 0,0], "lvDefault": 55, "strDefault": 35, "intDefault": 30, "vitDefault": 32, "agiDefault": 43, "lucDefault": 35, "showDefault":true },
  "281":{  "attr":[1,1,3,3,2,1,2,4],"id": 281, "genusID":31,"name": "サキュバス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [50, 63, 69, 0, 0,0], "lvDefault": 47, "strDefault": 24, "intDefault": 34, "vitDefault": 26, "agiDefault": 35, "lucDefault": 32, "showDefault":true },
  "282":{  "attr":[1,1,1,2,1,1,4,4],"id": 282, "genusID":31,"name": "キウン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [2, 141, 378, 0, 0,0], "lvDefault": 34, "strDefault": 20, "intDefault": 29, "vitDefault": 19, "agiDefault": 22, "lucDefault": 22, "showDefault":true },
  "283":{  "attr":[1,1,1,1,2,3,4,1],"id": 283, "genusID":31,"name": "インキュバス", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [29, 181, 0, 0, 0,0], "lvDefault": 23, "strDefault": 13, "intDefault": 20, "vitDefault": 12, "agiDefault": 17, "lucDefault": 17, "showDefault":true },
  "284":{  "attr":[1,1,1,1,1,2,1,1],"id": 284, "genusID":31,"name": "フォーモリア", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [19, 171, 0, 0, 0,0], "lvDefault": 16, "strDefault": 15, "intDefault": 9, "vitDefault": 13, "agiDefault": 9, "lucDefault": 12, "showDefault":true },
  "285":{  "attr":[1,1,1,2,3,1,1,1],"id": 285, "genusID":31,"name": "リリム", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [19, 22, 190, 0, 0,0], "lvDefault": 9, "strDefault": 7, "intDefault": 12, "vitDefault": 5, "agiDefault": 7, "lucDefault": 6, "showDefault":true },
  "286":{  "attr":[1,1,1,1,4,2,1,1],"id": 286, "genusID":31,"name": "ザントマン", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [19, 63, 0, 0, 0,0], "lvDefault": 4, "strDefault": 3, "intDefault": 6, "vitDefault": 5, "agiDefault": 6, "lucDefault": 2, "showDefault":true },
  "287":{  "attr":[0,0,0,0,0,0,0,0],"id": 287, "genusID":31,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "288":{  "attr":[0,0,0,0,0,0,0,0],"id": 288, "genusID":31,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "289":{  "attr":[3,1,2,3,3,3,4,4],"id": 289, "genusID":32,"name": "マーラ", "devilCost": 24, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [139, 142, 162, 0, 0,0], "lvDefault": 88, "strDefault": 59, "intDefault": 61, "vitDefault": 54, "agiDefault": 52, "lucDefault": 53, "showDefault":true },
  "290":{  "attr":[1,1,6,2,1,1,3,4],"id": 290, "genusID":32,"name": "スルト", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [3, 9, 382, 0, 0,0], "lvDefault": 77, "strDefault": 53, "intDefault": 49, "vitDefault": 51, "agiDefault": 45, "lucDefault": 48, "showDefault":true },
  "291":{  "attr":[1,1,1,1,6,1,4,4],"id": 291, "genusID":32,"name": "ツィツィミトル", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [38, 50, 370, 0, 0,0], "lvDefault": 71, "strDefault": 45, "intDefault": 49, "vitDefault": 43, "agiDefault": 41, "lucDefault": 45, "showDefault":true },
  "292":{  "attr":[3,1,1,1,2,3,1,4],"id": 292, "genusID":32,"name": "アバドン", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [162, 392, 0, 0, 0,0], "lvDefault": 60, "strDefault": 42, "intDefault": 33, "vitDefault": 41, "agiDefault": 38, "lucDefault": 36, "showDefault":true },
  "293":{  "attr":[1,1,2,6,1,1,4,1],"id": 293, "genusID":32,"name": "キングフロスト", "devilCost": 41, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [18, 106, 152, 0, 0,0], "lvDefault": 40, "strDefault": 26, "intDefault": 32, "vitDefault": 29, "agiDefault": 25, "lucDefault": 28, "showDefault":true },
  "294":{  "attr":[1,4,1,3,1,3,1,3],"id": 294, "genusID":32,"name": "ロキ", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [15, 76, 136, 0, 0,0], "lvDefault": 52, "strDefault": 33, "intDefault": 38, "vitDefault": 30, "agiDefault": 32, "lucDefault": 33, "showDefault":true },
  "295":{  "attr":[1,1,4,1,1,1,2,4],"id": 295, "genusID":32,"name": "バロール", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [5, 47, 155, 0, 0,0], "lvDefault": 44, "strDefault": 32, "intDefault": 30, "vitDefault": 27, "agiDefault": 27, "lucDefault": 26, "showDefault":true },
  "296":{  "attr":[0,0,0,0,0,0,0,0],"id": 296, "genusID":32,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "297":{  "attr":[0,0,0,0,0,0,0,0],"id": 297, "genusID":32,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "298":{  "attr":[3,3,1,2,2,1,1,1],"id": 298, "genusID":33,"name": "ファフニール", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [140, 156, 0, 0, 0,0], "lvDefault": 72, "strDefault": 51, "intDefault": 40, "vitDefault": 47, "agiDefault": 43, "lucDefault": 45, "showDefault":true },
  "299":{  "attr":[1,3,1,5,3,2,2,1],"id": 299, "genusID":33,"name": "ニーズホッグ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [48, 168, 182, 0, 0,0], "lvDefault": 65, "strDefault": 46, "intDefault": 40, "vitDefault": 46, "agiDefault": 35, "lucDefault": 38, "showDefault":true },
  "300":{  "attr":[1,1,1,1,5,2,1,1],"id": 300, "genusID":33,"name": "ムシュフシュ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [21, 71, 110, 0, 0,0], "lvDefault": 61, "strDefault": 40, "intDefault": 38, "vitDefault": 35, "agiDefault": 39, "lucDefault": 41, "showDefault":true },
  "301":{  "attr":[1,1,1,2,1,1,1,3],"id": 301, "genusID":33,"name": "キングー", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [3, 127, 161, 0, 0,0], "lvDefault": 46, "strDefault": 30, "intDefault": 35, "vitDefault": 25, "agiDefault": 29, "lucDefault": 29, "showDefault":true },
  "302":{  "attr":[1,1,1,2,1,2,1,4],"id": 302, "genusID":33,"name": "バジリスク", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [71, 178, 0, 0, 0,0], "lvDefault": 35, "strDefault": 25, "intDefault": 28, "vitDefault": 18, "agiDefault": 22, "lucDefault": 22, "showDefault":true },
  "303":{  "attr":[1,1,2,3,1,1,1,1],"id": 303, "genusID":33,"name": "ハクジョウシ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 104, 187, 0, 0,0], "lvDefault": 27, "strDefault": 20, "intDefault": 18, "vitDefault": 15, "agiDefault": 18, "lucDefault": 20, "showDefault":true },
  "304":{  "attr":[1,1,1,1,1,1,2,2],"id": 304, "genusID":33,"name": "チョトンダ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [10, 154, 0, 0, 0,0], "lvDefault": 15, "strDefault": 15, "intDefault": 10, "vitDefault": 11, "agiDefault": 10, "lucDefault": 9, "showDefault":true },
  "305":{  "attr":[0,0,0,0,0,0,0,0],"id": 305, "genusID":33,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "306":{  "attr":[0,0,0,0,0,0,0,0],"id": 306, "genusID":33,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "307":{  "attr":[2,3,2,3,3,3,2,4],"id": 307, "genusID":34,"name": "レギオン", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [25, 47, 0, 0, 0,0], "lvDefault": 36, "strDefault": 30, "intDefault": 19, "vitDefault": 27, "agiDefault": 20, "lucDefault": 22, "showDefault":true },
  "308":{  "attr":[1,1,2,1,1,1,1,4],"id": 308, "genusID":34,"name": "ピシャーチャ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [34, 48, 0, 0, 0,0], "lvDefault": 29, "strDefault": 25, "intDefault": 15, "vitDefault": 19, "agiDefault": 20, "lucDefault": 18, "showDefault":true },
  "309":{  "attr":[1,1,1,1,1,1,2,4],"id": 309, "genusID":34,"name": "マカーブル", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [54, 176, 0, 0, 0,0], "lvDefault": 18, "strDefault": 17, "intDefault": 9, "vitDefault": 13, "agiDefault": 12, "lucDefault": 13, "showDefault":true },
  "310":{  "attr":[1,1,4,2,1,1,1,3],"id": 310, "genusID":34,"name": "インフェルノ", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [2, 375, 0, 0, 0,0], "lvDefault": 23, "strDefault": 17, "intDefault": 13, "vitDefault": 22, "agiDefault": 13, "lucDefault": 14, "showDefault":true },
  "311":{  "attr":[1,1,2,1,1,1,2,1],"id": 311, "genusID":34,"name": "ディブク", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [63, 123, 0, 0, 0,0], "lvDefault": 2, "strDefault": 3, "intDefault": 3, "vitDefault": 2, "agiDefault": 3, "lucDefault": 5, "showDefault":true },
  "312":{  "attr":[1,1,2,2,2,1,1,1],"id": 312, "genusID":34,"name": "ポルターガイスト", "devilCost": 13, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [127, 163, 0, 0, 0,0], "lvDefault": 7, "strDefault": 7, "intDefault": 4, "vitDefault": 9, "agiDefault": 7, "lucDefault": 4, "showDefault":true },
  "313":{  "attr":[0,0,0,0,0,0,0,0],"id": 313, "genusID":34,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "314":{  "attr":[0,0,0,0,0,0,0,0],"id": 314, "genusID":34,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "315":{  "attr":[5,5,1,1,1,1,2,2],"id": 315, "genusID":35,"name": "ドッペルゲンガー", "devilCost": 16, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [140, 0, 0, 0, 0,0], "lvDefault": 25, "strDefault": 17, "intDefault": 17, "vitDefault": 17, "agiDefault": 17, "lucDefault": 17, "showDefault":true },
  "316":{  "attr":[1,1,2,2,2,2,2,1],"id": 316, "genusID":35,"name": "スライム", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [151, 0, 0, 0, 0,0], "lvDefault": 1, "strDefault": 2, "intDefault": 5, "vitDefault": 5, "agiDefault": 3, "lucDefault": 3, "showDefault":true },
  "317":{  "attr":[0,0,0,0,0,0,0,0],"id": 317, "genusID":35,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":true },
  "318":{  "attr":[0,0,0,0,0,0,0,0],"id": 318, "genusID":35,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":true },
  "319":{  "attr":[1,1,2,1,1,1,2,4],"id": 319, "genusID":36,"name": "ヴェータラ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [67, 126, 128, 0, 0,0], "lvDefault": 67, "strDefault": 47, "intDefault": 39, "vitDefault": 47, "agiDefault": 37, "lucDefault": 41, "showDefault":true },
  "320":{  "attr":[1,1,2,1,1,1,1,4],"id": 320, "genusID":36,"name": "クドラク", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [49, 54, 389, 0, 0,0], "lvDefault": 56, "strDefault": 36, "intDefault": 32, "vitDefault": 37, "agiDefault": 39, "lucDefault": 34, "showDefault":true },
  "321":{  "attr":[1,1,2,1,3,3,2,4],"id": 321, "genusID":36,"name": "ストリゴイイ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [48, 65, 174, 0, 0,0], "lvDefault": 45, "strDefault": 34, "intDefault": 25, "vitDefault": 30, "agiDefault": 30, "lucDefault": 26, "showDefault":true },
  "322":{  "attr":[1,1,2,1,1,1,2,4],"id": 322, "genusID":36,"name": "グール", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [53, 164, 0, 0, 0,0], "lvDefault": 30, "strDefault": 26, "intDefault": 16, "vitDefault": 21, "agiDefault": 19, "lucDefault": 18, "showDefault":true },
  "323":{  "attr":[1,1,1,1,1,1,2,4],"id": 323, "genusID":36,"name": "チュレル", "devilCost": 15, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [49, 69, 0, 0, 0,0], "lvDefault": 24, "strDefault": 17, "intDefault": 20, "vitDefault": 15, "agiDefault": 14, "lucDefault": 16, "showDefault":true },
  "324":{  "attr":[1,1,3,3,2,2,2,4],"id": 324, "genusID":36,"name": "モウリョウ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [46, 130, 0, 0, 0,0], "lvDefault": 17, "strDefault": 17, "intDefault": 11, "vitDefault": 13, "agiDefault": 10, "lucDefault": 10, "showDefault":true },
  "325":{  "attr":[1,1,2,2,1,2,2,3],"id": 325, "genusID":36,"name": "ガキ", "devilCost": 13, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [126, 163, 0, 0, 0,0], "lvDefault": 6, "strDefault": 8, "intDefault": 5, "vitDefault": 6, "agiDefault": 7, "lucDefault": 2, "showDefault":true },
  "326":{  "attr":[1,1,1,1,1,1,1,1],"id": 326, "genusID":18,"name": "ブギブー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [29, 105, 0, 0, 0,0], "lvDefault": 20, "strDefault": 13, "intDefault": 17, "vitDefault": 14, "agiDefault": 15, "lucDefault": 16, "showDefault":true },
  "327":{  "attr":[1,1,1,1,1,1,1,1],"id": 327, "genusID":18,"name": "ボギブー", "devilCost": 12, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [11, 20, 68, 0, 0,0], "lvDefault": 20, "strDefault": 14, "intDefault": 14, "vitDefault": 14, "agiDefault": 14, "lucDefault": 14, "showDefault":true },
  "328":{  "attr":[1,1,1,1,1,1,4,4],"id": 328, "genusID":44,"name": "サキミタマ", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [140, 396, 0, 0, 0,0], "lvDefault": 36, "strDefault": 23, "intDefault": 22, "vitDefault": 26, "agiDefault": 22, "lucDefault": 25, "showDefault":true },
  "329":{  "attr":[1,1,1,1,1,1,4,4],"id": 329, "genusID":44,"name": "クシミタマ", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [142, 143, 0, 0, 0,0], "lvDefault": 31, "strDefault": 19, "intDefault": 20, "vitDefault": 22, "agiDefault": 23, "lucDefault": 19, "showDefault":true },
  "330":{  "attr":[1,1,1,1,1,1,4,4],"id": 330, "genusID":44,"name": "ニギミタマ", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [104, 118, 0, 0, 0,0], "lvDefault": 26, "strDefault": 15, "intDefault": 20, "vitDefault": 17, "agiDefault": 17, "lucDefault": 19, "showDefault":true },
  "331":{  "attr":[1,1,1,1,1,1,4,4],"id": 331, "genusID":44,"name": "アラミタマ", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [142, 151, 0, 0, 0,0], "lvDefault": 21, "strDefault": 17, "intDefault": 13, "vitDefault": 14, "agiDefault": 16, "lucDefault": 13, "showDefault":true },
  "332":{  "attr":[1,1,1,1,1,1,1,1],"id": 332, "genusID":18,"name": "バガブー", "devilCost": 12, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [2, 54, 0, 0, 0,0], "lvDefault": 20, "strDefault": 17, "intDefault": 13, "vitDefault": 16, "agiDefault": 15, "lucDefault": 14, "showDefault":true },
  "333":{  "attr":[1,1,1,1,1,1,4,2],"id": 333, "genusID":55,"name": "デモニカもどき(L)", "devilCost": 12, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [228, 241, 398, 0, 0,0], "lvDefault": 1, "strDefault": 3, "intDefault": 5, "vitDefault": 4, "agiDefault": 4, "lucDefault": 4, "showDefault":true },
  "334":{  "attr":[1,1,4,1,1,1,4,4],"id": 334, "genusID":38,"name": "サラマンダー", "devilCost": 48, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [5, 0, 0, 0, 0,0], "lvDefault": 32, "strDefault": 23, "intDefault": 20, "vitDefault": 20, "agiDefault": 22, "lucDefault": 21, "showDefault":true },
  "335":{  "attr":[1,1,1,4,1,1,4,4],"id": 335, "genusID":38,"name": "ウンディーネ", "devilCost": 48, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [13, 0, 0, 0, 0,0], "lvDefault": 28, "strDefault": 18, "intDefault": 21, "vitDefault": 17, "agiDefault": 19, "lucDefault": 19, "showDefault":true },
  "336":{  "attr":[1,1,1,1,1,4,4,4],"id": 336, "genusID":38,"name": "シルフ", "devilCost": 48, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [29, 0, 0, 0, 0,0], "lvDefault": 25, "strDefault": 17, "intDefault": 16, "vitDefault": 14, "agiDefault": 20, "lucDefault": 18, "showDefault":true },
  "337":{  "attr":[1,3,1,1,1,1,4,4],"id": 337, "genusID":38,"name": "ノーム", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [110, 113, 0, 0, 0,0], "lvDefault": 21, "strDefault": 14, "intDefault": 13, "vitDefault": 17, "agiDefault": 15, "lucDefault": 14, "showDefault":true },
  "338":{  "attr":[1,1,3,2,1,1,4,4],"id": 338, "genusID":38,"name": "フレイミーズ", "devilCost": 45, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [4, 111, 0, 0, 0,0], "lvDefault": 20, "strDefault": 15, "intDefault": 14, "vitDefault": 14, "agiDefault": 13, "lucDefault": 14, "showDefault":true },
  "339":{  "attr":[1,1,2,3,1,1,4,4],"id": 339, "genusID":38,"name": "アクアンズ", "devilCost": 45, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [10, 108, 0, 0, 0,0], "lvDefault": 16, "strDefault": 12, "intDefault": 11, "vitDefault": 12, "agiDefault": 11, "lucDefault": 12, "showDefault":true },
  "340":{  "attr":[1,1,1,1,2,3,4,4],"id": 340, "genusID":38,"name": "エアロス", "devilCost": 45, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [28, 0, 0, 0, 0,0], "lvDefault": 12, "strDefault": 7, "intDefault": 10, "vitDefault": 9, "agiDefault": 11, "lucDefault": 9, "showDefault":true },
  "341":{  "attr":[1,3,1,1,1,1,4,4],"id": 341, "genusID":38,"name": "アーシーズ", "devilCost": 47, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [19, 0, 0, 0, 0,0], "lvDefault": 8, "strDefault": 7, "intDefault": 9, "vitDefault": 6, "agiDefault": 5, "lucDefault": 7, "showDefault":true },
  "342":{  "attr":[1,1,1,1,1,1,4,2],"id": 342, "genusID":55,"name": "デモニカもどき(N)", "devilCost": 12, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [231, 242, 398, 0, 0,0], "lvDefault": 1, "strDefault": 4, "intDefault": 4, "vitDefault": 4, "agiDefault": 4, "lucDefault": 4, "showDefault":true },
  "343":{  "attr":[1,1,1,1,1,1,4,2],"id": 343, "genusID":55,"name": "デモニカもどき(C)", "devilCost": 12, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [240, 243, 398, 0, 0,0], "lvDefault": 1, "strDefault": 5, "intDefault": 3, "vitDefault": 4, "agiDefault": 4, "lucDefault": 4, "showDefault":true },
  "344":{  "attr":[4,1,1,1,6,2,4,4],"id": 344, "genusID":39,"name": "マザーハーロット", "devilCost": 50, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [24, 42, 56, 0, 0,0], "lvDefault": 90, "strDefault": 60, "intDefault": 62, "vitDefault": 58, "agiDefault": 53, "lucDefault": 57, "showDefault":true },
  "345":{  "attr":[1,1,3,3,3,3,4,4],"id": 345, "genusID":39,"name": "トランペッター", "devilCost": 22, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [39, 51, 82, 0, 0,0], "lvDefault": 83, "strDefault": 52, "intDefault": 53, "vitDefault": 52, "agiDefault": 49, "lucDefault": 58, "showDefault":true },
  "346":{  "attr":[1,1,1,3,2,5,4,4],"id": 346, "genusID":39,"name": "ペイルライダー", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [35, 56, 176, 0, 0,0], "lvDefault": 78, "strDefault": 51, "intDefault": 45, "vitDefault": 49, "agiDefault": 54, "lucDefault": 50, "showDefault":true },
  "347":{  "attr":[1,1,2,6,1,1,4,4],"id": 347, "genusID":39,"name": "ブラックライダー", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [17, 38, 129, 0, 0,0], "lvDefault": 69, "strDefault": 43, "intDefault": 48, "vitDefault": 40, "agiDefault": 48, "lucDefault": 43, "showDefault":true },
  "348":{  "attr":[1,1,4,2,1,1,4,4],"id": 348, "genusID":39,"name": "レッドライダー", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [6, 158, 392, 0, 0,0], "lvDefault": 59, "strDefault": 36, "intDefault": 39, "vitDefault": 37, "agiDefault": 44, "lucDefault": 36, "showDefault":true },
  "349":{  "attr":[1,1,1,1,4,2,4,4],"id": 349, "genusID":39,"name": "ホワイトライダー", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [24, 185, 393, 0, 0,0], "lvDefault": 49, "strDefault": 35, "intDefault": 29, "vitDefault": 31, "agiDefault": 36, "lucDefault": 31, "showDefault":true },
  "350":{  "attr":[3,5,1,1,1,1,3,4],"id": 350, "genusID":39,"name": "アリス", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [50, 57, 187, 0, 0,0], "lvDefault": 39, "strDefault": 25, "intDefault": 37, "vitDefault": 23, "agiDefault": 25, "lucDefault": 22, "showDefault":true },
  "351":{  "attr":[3,3,1,1,2,1,3,4],"id": 351, "genusID":39,"name": "マタドール", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [136, 161, 397, 0, 0,0], "lvDefault": 30, "strDefault": 21, "intDefault": 21, "vitDefault": 17, "agiDefault": 27, "lucDefault": 19, "showDefault":true },
  "352":{  "attr":[1,1,3,3,2,1,3,4],"id": 352, "genusID":39,"name": "デイビット", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [55, 74, 176, 0, 0,0], "lvDefault": 22, "strDefault": 16, "intDefault": 16, "vitDefault": 14, "agiDefault": 16, "lucDefault": 19, "showDefault":true },
  "353":{  "attr":[0,0,0,0,0,0,0,0],"id": 353, "genusID":39,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "354":{  "attr":[0,0,0,0,0,0,0,0],"id": 354, "genusID":39,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "355":{  "attr":[1,1,1,1,1,1,4,4],"id": 355, "genusID":40,"name": "カンギテン", "devilCost": 27, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [119, 147, 192, 0, 0,0], "lvDefault": 80, "strDefault": 51, "intDefault": 48, "vitDefault": 53, "agiDefault": 51, "lucDefault": 57, "showDefault":true },
  "356":{  "attr":[3,4,2,1,1,1,4,1],"id": 356, "genusID":40,"name": "カーマ", "devilCost": 26, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [141, 186, 190, 0, 0,0], "lvDefault": 72, "strDefault": 47, "intDefault": 49, "vitDefault": 42, "agiDefault": 47, "lucDefault": 51, "showDefault":true },
  "357":{  "attr":[1,1,4,1,1,1,4,4],"id": 357, "genusID":40,"name": "キンマモン", "devilCost": 28, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [37, 105, 379, 0, 0,0], "lvDefault": 58, "strDefault": 33, "intDefault": 42, "vitDefault": 37, "agiDefault": 40, "lucDefault": 42, "showDefault":true },
  "358":{  "attr":[1,1,1,1,1,1,4,4],"id": 358, "genusID":40,"name": "アメノフトタマ", "devilCost": 27, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [103, 126, 137, 0, 0,0], "lvDefault": 42, "strDefault": 27, "intDefault": 33, "vitDefault": 30, "agiDefault": 26, "lucDefault": 30, "showDefault":true },
  "359":{  "attr":[2,3,1,1,1,1,4,1],"id": 359, "genusID":40,"name": "カンバリ", "devilCost": 26, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [60, 139, 184, 0, 0,0], "lvDefault": 27, "strDefault": 21, "intDefault": 17, "vitDefault": 23, "agiDefault": 20, "lucDefault": 20, "showDefault":true },
  "360":{  "attr":[0,0,0,0,0,0,0,0],"id": 360, "genusID":40,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "361":{  "attr":[0,0,0,0,0,0,0,0],"id": 361, "genusID":40,"name": "[ダミー]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "362":{  "attr":[1,2,2,2,2,2,3,3],"id": 362, "genusID":41,"name": "イナバシロウサギ", "devilCost": 14, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [105, 122, 399, 0, 0,0], "lvDefault": 37, "strDefault": 24, "intDefault": 23, "vitDefault": 22, "agiDefault": 33, "lucDefault": 24, "showDefault":true },
  "363":{  "attr":[1,1,1,1,4,2,1,1],"id": 363, "genusID":41,"name": "クダ", "devilCost": 17, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [23, 141, 402, 0, 0,0], "lvDefault": 28, "strDefault": 17, "intDefault": 28, "vitDefault": 19, "agiDefault": 16, "lucDefault": 19, "showDefault":true },
  "364":{  "attr":[1,1,2,1,1,1,3,3],"id": 364, "genusID":41,"name": "チュパカブラ", "devilCost": 17, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [48, 134, 166, 0, 0,0], "lvDefault": 19, "strDefault": 17, "intDefault": 9, "vitDefault": 16, "agiDefault": 15, "lucDefault": 15, "showDefault":true },
  "365":{  "attr":[1,1,3,3,3,3,1,1],"id": 365, "genusID":41,"name": "マメダヌキ", "devilCost": 18, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [174, 180, 400, 0, 0,0], "lvDefault": 13, "strDefault": 8, "intDefault": 8, "vitDefault": 12, "agiDefault": 11, "lucDefault": 15, "showDefault":true },
  "366":{  "attr":[0,0,0,0,0,0,0,0],"id": 366, "genusID":41,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "367":{  "attr":[0,0,0,0,0,0,0,0],"id": 367, "genusID":41,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "368":{  "attr":[3,1,3,3,3,3,4,4],"id": 368, "genusID":42,"name": "マサカド", "devilCost": 60, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [177, 192, 390, 0, 0,0], "lvDefault": 92, "strDefault": 62, "intDefault": 64, "vitDefault": 55, "agiDefault": 58, "lucDefault": 57, "showDefault":true },
  "369":{  "attr":[1,1,3,2,3,4,1,4],"id": 369, "genusID":42,"name": "テスカトリポカ", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [33, 45, 165, 0, 0,0], "lvDefault": 81, "strDefault": 53, "intDefault": 53, "vitDefault": 54, "agiDefault": 52, "lucDefault": 46, "showDefault":true },
  "370":{  "attr":[3,1,2,1,1,1,1,1],"id": 370, "genusID":42,"name": "アティス", "devilCost": 19, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [17, 144, 0, 0, 0,0], "lvDefault": 73, "strDefault": 53, "intDefault": 44, "vitDefault": 47, "agiDefault": 44, "lucDefault": 46, "showDefault":true },
  "371":{  "attr":[1,1,1,1,1,1,4,1],"id": 371, "genusID":42,"name": "アラミサキ", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [122, 144, 174, 0, 0,0], "lvDefault": 58, "strDefault": 42, "intDefault": 40, "vitDefault": 37, "agiDefault": 34, "lucDefault": 36, "showDefault":true },
  "372":{  "attr":[3,3,1,1,3,2,1,1],"id": 372, "genusID":42,"name": "ディオニュソス", "devilCost": 20, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [70, 74, 138, 0, 0,0], "lvDefault": 41, "strDefault": 26, "intDefault": 33, "vitDefault": 27, "agiDefault": 25, "lucDefault": 27, "showDefault":true },
  "373":{  "attr":[1,1,4,1,1,1,1,4],"id": 373, "genusID":42,"name": "オグン", "devilCost": 21, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [4, 185, 381, 0, 0,0], "lvDefault": 24, "strDefault": 18, "intDefault": 15, "vitDefault": 15, "agiDefault": 22, "lucDefault": 17, "showDefault":true },
  "374":{  "attr":[0,0,0,0,0,0,0,0],"id": 374, "genusID":42,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 61, "intDefault": 63, "vitDefault": 61, "agiDefault": 61, "lucDefault": 61, "showDefault":false },
  "375":{  "attr":[3,4,1,1,1,1,4,4],"id": 375, "genusID":48,"name": "アリラト", "devilCost": 42, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [39, 103, 143, 0, 0,0], "lvDefault": 84, "strDefault": 54, "intDefault": 54, "vitDefault": 63, "agiDefault": 47, "lucDefault": 54, "showDefault":true },
  "376":{  "attr":[0,0,0,0,0,0,0,0],"id": 376, "genusID":24,"name": "[セイテンタイセイ]", "devilCost": 95, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 54, "strDefault": 37, "intDefault": 35, "vitDefault": 33, "agiDefault": 38, "lucDefault": 34, "showDefault":false },
  "377":{  "attr":[0,0,0,0,0,0,0,0],"id": 377, "genusID":3,"name": "[ヤタガラス]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 57, "strDefault": 37, "intDefault": 37, "vitDefault": 32, "agiDefault": 42, "lucDefault": 38, "showDefault":false },
  "378":{  "attr":[0,0,0,0,0,0,0,0],"id": 378, "genusID":26,"name": "[ショクイン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 61, "strDefault": 43, "intDefault": 37, "vitDefault": 39, "agiDefault": 40, "lucDefault": 39, "showDefault":false },
  "379":{  "attr":[0,0,0,0,0,0,0,0],"id": 379, "genusID":5,"name": "[ケルプ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 62, "strDefault": 37, "intDefault": 44, "vitDefault": 36, "agiDefault": 39, "lucDefault": 40, "showDefault":false },
  "380":{  "attr":[0,0,0,0,0,0,0,0],"id": 380, "genusID":39,"name": "[マタドール]", "devilCost": 90, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [136, 161, 397, 0, 0,0], "lvDefault": 30, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "381":{  "attr":[0,0,0,0,0,0,0,0],"id": 381, "genusID":16,"name": "[ＵＮＫＮＯＷＮ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [1, 101, 0, 0, 0,0], "lvDefault": 99, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "382":{  "attr":[0,0,0,0,0,0,0,0],"id": 382, "genusID":18,"name": "[ＵＮＫＮＯＷＮ]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [10, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "383":{  "attr":[0,0,0,0,0,0,0,0],"id": 383, "genusID":34,"name": "[ＵＮＫＮＯＷＮ]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [127, 163, 0, 0, 0,0], "lvDefault": 99, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "384":{  "attr":[0,0,0,0,0,0,0,0],"id": 384, "genusID":35,"name": "[ＵＮＫＮＯＷＮ]", "devilCost": 84, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [151, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "385":{  "attr":[0,0,0,0,0,0,0,0],"id": 385, "genusID":35,"name": "[ＵＮＫＮＯＷＮ]", "devilCost": 84, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [151, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "386":{  "attr":[0,0,0,0,0,0,0,0],"id": 386, "genusID":22,"name": "[ピシャーチャ]", "devilCost": 90, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 45, "strDefault": 29, "intDefault": 29, "vitDefault": 29, "agiDefault": 29, "lucDefault": 29, "showDefault":false },
  "387":{  "attr":[0,0,0,0,0,0,0,0],"id": 387, "genusID":42,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [4, 185, 381, 0, 0,0], "lvDefault": 99, "strDefault": 63, "intDefault": 63, "vitDefault": 63, "agiDefault": 63, "lucDefault": 63, "showDefault":false },
  "388":{  "attr":[1,1,5,2,1,1,1,4],"id": 388, "genusID":32,"name": "モラクス", "devilCost": 27, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [73, 154, 391, 0, 0,0], "lvDefault": 15, "strDefault": 13, "intDefault": 15, "vitDefault": 12, "agiDefault": 11, "lucDefault": 9, "showDefault":true },
  "389":{  "attr":[1,1,1,4,1,2,4,1],"id": 389, "genusID":32,"name": "ミトラス", "devilCost": 27, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [53, 58, 157, 0, 0,0], "lvDefault": 25, "strDefault": 17, "intDefault": 21, "vitDefault": 19, "agiDefault": 17, "lucDefault": 16, "showDefault":true },
  "390":{  "attr":[3,3,2,1,2,1,1,3],"id": 390, "genusID":32,"name": "オーカス", "devilCost": 27, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [49, 152, 155, 0, 0,0], "lvDefault": 33, "strDefault": 25, "intDefault": 23, "vitDefault": 26, "agiDefault": 19, "lucDefault": 21, "showDefault":true },
  "391":{  "attr":[1,1,5,2,1,5,3,3],"id": 391, "genusID":32,"name": "アスラ", "devilCost": 28, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [5, 68, 161, 0, 0,0], "lvDefault": 42, "strDefault": 28, "intDefault": 29, "vitDefault": 31, "agiDefault": 27, "lucDefault": 26, "showDefault":true },
  "392":{  "attr":[3,3,2,1,6,1,3,3],"id": 392, "genusID":19,"name": "ウロボロス", "devilCost": 38, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [23, 135, 396, 0, 0,0], "lvDefault": 49, "strDefault": 32, "intDefault": 33, "vitDefault": 36, "agiDefault": 32, "lucDefault": 29, "showDefault":true },
  "393":{  "attr":[1,1,5,2,3,1,1,4],"id": 393, "genusID":32,"name": "モロク", "devilCost": 29, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [74, 156, 392, 0, 0,0], "lvDefault": 50, "strDefault": 36, "intDefault": 33, "vitDefault": 30, "agiDefault": 32, "lucDefault": 34, "showDefault":true },
  "394":{  "attr":[1,1,3,4,1,2,1,4],"id": 394, "genusID":28,"name": "ミスラ", "devilCost": 35, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [54, 59, 153, 0, 0,0], "lvDefault": 53, "strDefault": 32, "intDefault": 38, "vitDefault": 35, "agiDefault": 34, "lucDefault": 35, "showDefault":true },
  "395":{  "attr":[3,3,2,3,2,1,1,4],"id": 395, "genusID":20,"name": "オルクス", "devilCost": 39, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [50, 153, 162, 0, 0,0], "lvDefault": 55, "strDefault": 38, "intDefault": 33, "vitDefault": 39, "agiDefault": 34, "lucDefault": 36, "showDefault":true },
  "396":{  "attr":[1,1,5,2,3,5,4,1],"id": 396, "genusID":25,"name": "アシェラト", "devilCost": 30, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [6, 176, 182, 0, 0,0], "lvDefault": 58, "strDefault": 40, "intDefault": 41, "vitDefault": 37, "agiDefault": 36, "lucDefault": 35, "showDefault":true },
  "397":{  "attr":[1,1,4,6,2,1,1,3],"id": 397, "genusID":33,"name": "ティアマト", "devilCost": 36, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [15, 131, 169, 0, 0,0], "lvDefault": 63, "strDefault": 41, "intDefault": 41, "vitDefault": 42, "agiDefault": 40, "lucDefault": 40, "showDefault":true },
  "398":{  "attr":[1,2,1,1,1,1,3,3],"id": 398, "genusID":31,"name": "マーヤー", "devilCost": 31, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [38, 143, 0, 0, 0,0], "lvDefault": 70, "strDefault": 44, "intDefault": 50, "vitDefault": 40, "agiDefault": 45, "lucDefault": 46, "showDefault":true },
  "399":{  "attr":[1,5,2,5,1,5,4,1],"id": 399, "genusID":1,"name": "マンセマット", "devilCost": 34, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [35, 39, 107, 0, 0,0], "lvDefault": 82, "strDefault": 50, "intDefault": 57, "vitDefault": 49, "agiDefault": 51, "lucDefault": 54, "showDefault":true },
  "400":{  "attr":[0,0,0,0,0,0,0,0],"id": 400, "genusID":32,"name": "[モラクス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 10, "strDefault": 13, "intDefault": 14, "vitDefault": 7, "agiDefault": 9, "lucDefault": 11, "showDefault":false },
  "401":{  "attr":[0,0,0,0,0,0,0,0],"id": 401, "genusID":32,"name": "[ミトラス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 19, "strDefault": 17, "intDefault": 17, "vitDefault": 13, "agiDefault": 13, "lucDefault": 18, "showDefault":false },
  "402":{  "attr":[0,0,0,0,0,0,0,0],"id": 402, "genusID":32,"name": "[オーカス]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 28, "strDefault": 26, "intDefault": 24, "vitDefault": 17, "agiDefault": 18, "lucDefault": 22, "showDefault":false },
  "403":{  "attr":[0,0,0,0,0,0,0,0],"id": 403, "genusID":32,"name": "[アスラ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 37, "strDefault": 29, "intDefault": 29, "vitDefault": 22, "agiDefault": 24, "lucDefault": 27, "showDefault":false },
  "404":{  "attr":[0,0,0,0,0,0,0,0],"id": 404, "genusID":19,"name": "[ウロボロス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 43, "strDefault": 27, "intDefault": 30, "vitDefault": 31, "agiDefault": 27, "lucDefault": 31, "showDefault":true },
  "405":{  "attr":[0,0,0,0,0,0,0,0],"id": 405, "genusID":19,"name": "[ウロボロス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 46, "strDefault": 37, "intDefault": 35, "vitDefault": 32, "agiDefault": 27, "lucDefault": 42, "showDefault":false },
  "406":{  "attr":[0,0,0,0,0,0,0,0],"id": 406, "genusID":32,"name": "[モロク]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 46, "strDefault": 35, "intDefault": 35, "vitDefault": 31, "agiDefault": 31, "lucDefault": 33, "showDefault":false },
  "407":{  "attr":[0,0,0,0,0,0,0,0],"id": 407, "genusID":28,"name": "[ミスラ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 50, "strDefault": 38, "intDefault": 37, "vitDefault": 34, "agiDefault": 31, "lucDefault": 35, "showDefault":false },
  "408":{  "attr":[0,0,0,0,0,0,0,0],"id": 408, "genusID":20,"name": "[オルクス]", "devilCost": 95, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 51, "strDefault": 38, "intDefault": 38, "vitDefault": 35, "agiDefault": 32, "lucDefault": 35, "showDefault":false },
  "409":{  "attr":[0,0,0,0,0,0,0,0],"id": 409, "genusID":25,"name": "[アシェラト]", "devilCost": 96, "baseHP": 110, "HP": 25, "baseMP": 110, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 53, "strDefault": 37, "intDefault": 38, "vitDefault": 37, "agiDefault": 36, "lucDefault": 36, "showDefault":false },
  "410":{  "attr":[0,0,0,0,0,0,0,0],"id": 410, "genusID":33,"name": "[ティアマト]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 55, "strDefault": 41, "intDefault": 42, "vitDefault": 38, "agiDefault": 35, "lucDefault": 36, "showDefault":false },
  "411":{  "attr":[0,0,0,0,0,0,0,0],"id": 411, "genusID":31,"name": "[マーヤー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 63, "strDefault": 45, "intDefault": 45, "vitDefault": 42, "agiDefault": 39, "lucDefault": 43, "showDefault":false },
  "412":{  "attr":[0,0,0,0,0,0,0,0],"id": 412, "genusID":45,"name": "[ゴア]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 65, "strDefault": 47, "intDefault": 47, "vitDefault": 42, "agiDefault": 37, "lucDefault": 45, "showDefault":false },
  "413":{  "attr":[0,0,0,0,0,0,0,0],"id": 413, "genusID":1,"name": "[マンセマット]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 66, "strDefault": 55, "intDefault": 55, "vitDefault": 50, "agiDefault": 47, "lucDefault": 52, "showDefault":false },
  "414":{  "attr":[0,0,0,0,0,0,0,0],"id": 414, "genusID":53,"name": "[ゼレーニン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 67, "strDefault": 48, "intDefault": 47, "vitDefault": 44, "agiDefault": 40, "lucDefault": 45, "showDefault":false },
  "415":{  "attr":[0,0,0,0,0,0,0,0],"id": 415, "genusID":54,"name": "[ゼレーニン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 76, "strDefault": 57, "intDefault": 59, "vitDefault": 56, "agiDefault": 52, "lucDefault": 57, "showDefault":false },
  "416":{  "attr":[0,0,0,0,0,0,0,0],"id": 416, "genusID":51,"name": "[ヒメネス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 73, "strDefault": 55, "intDefault": 55, "vitDefault": 50, "agiDefault": 47, "lucDefault": 52, "showDefault":false },
  "417":{  "attr":[0,0,0,0,0,0,0,0],"id": 417, "genusID":49,"name": "[メムアレフ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 76, "strDefault": 62, "intDefault": 62, "vitDefault": 62, "agiDefault": 57, "lucDefault": 62, "showDefault":false },
  "418":{  "attr":[0,0,0,0,0,0,0,0],"id": 418, "genusID":43,"name": "[ゴア]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 10, "strDefault": 7, "intDefault": 7, "vitDefault": 7, "agiDefault": 10, "lucDefault": 7, "showDefault":false },
  "419":{  "attr":[0,0,0,0,0,0,0,0],"id": 419, "genusID":43,"name": "[ヒメネス(C)]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 11, "intDefault": 11, "vitDefault": 11, "agiDefault": 11, "lucDefault": 11, "showDefault":false },
  "420":{  "attr":[0,0,0,0,0,0,0,0],"id": 420, "genusID":52,"name": "[ヒメネス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 70, "strDefault": 50, "intDefault": 50, "vitDefault": 50, "agiDefault": 47, "lucDefault": 50, "showDefault":false },
  "421":{  "attr":[0,0,0,0,0,0,0,0],"id": 421, "genusID":50,"name": "[メムアレフ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 80, "strDefault": 65, "intDefault": 65, "vitDefault": 65, "agiDefault": 60, "lucDefault": 65, "showDefault":false },
  "422":{  "attr":[0,0,0,0,0,0,0,0],"id": 422, "genusID":28,"name": "[ビフロンス]", "devilCost": 89, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 18, "strDefault": 13, "intDefault": 22, "vitDefault": 14, "agiDefault": 13, "lucDefault": 13, "showDefault":false },
  "423":{  "attr":[0,0,0,0,0,0,0,0],"id": 423, "genusID":19,"name": "[ナーガ]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 16, "strDefault": 13, "intDefault": 13, "vitDefault": 13, "agiDefault": 13, "lucDefault": 13, "showDefault":false },
  "424":{  "attr":[0,0,0,0,0,0,0,0],"id": 424, "genusID":29,"name": "[アズミ]", "devilCost": 89, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 11, "strDefault": 8, "intDefault": 9, "vitDefault": 7, "agiDefault": 11, "lucDefault": 8, "showDefault":false },
  "425":{  "attr":[0,0,0,0,0,0,0,0],"id": 425, "genusID":31,"name": "[リリム]", "devilCost": 93, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 9, "strDefault": 7, "intDefault": 12, "vitDefault": 5, "agiDefault": 7, "lucDefault": 6, "showDefault":false },
  "426":{  "attr":[0,0,0,0,0,0,0,0],"id": 426, "genusID":17,"name": "[カタキラウワ]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 25, "strDefault": 19, "intDefault": 19, "vitDefault": 19, "agiDefault": 19, "lucDefault": 19, "showDefault":false },
  "427":{  "attr":[0,0,0,0,0,0,0,0],"id": 427, "genusID":17,"name": "[カタキラウワ]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 46, "strDefault": 32, "intDefault": 32, "vitDefault": 32, "agiDefault": 32, "lucDefault": 32, "showDefault":false },
  "428":{  "attr":[0,0,0,0,0,0,0,0],"id": 428, "genusID":21,"name": "[ヌエ]", "devilCost": 89, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 29, "strDefault": 22, "intDefault": 20, "vitDefault": 18, "agiDefault": 18, "lucDefault": 19, "showDefault":false },
  "429":{  "attr":[0,0,0,0,0,0,0,0],"id": 429, "genusID":36,"name": "[グール]", "devilCost": 90, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 26, "strDefault": 23, "intDefault": 14, "vitDefault": 18, "agiDefault": 15, "lucDefault": 18, "showDefault":false },
  "430":{  "attr":[0,0,0,0,0,0,0,0],"id": 430, "genusID":1,"name": "[マンセマット]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 73, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "431":{  "attr":[0,0,0,0,0,0,0,0],"id": 431, "genusID":42,"name": "[アンノウン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 1, "strDefault": 1, "intDefault": 1, "vitDefault": 1, "agiDefault": 1, "lucDefault": 1, "showDefault":false },
  "432":{  "attr":[0,0,0,0,0,0,0,0],"id": 432, "genusID":10,"name": "[オンモラキ]", "devilCost": 88, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 2, "strDefault": 6, "intDefault": 6, "vitDefault": 6, "agiDefault": 9, "lucDefault": 8, "showDefault":false },
  "433":{  "attr":[0,0,0,0,0,0,0,0],"id": 433, "genusID":18,"name": "[ノッカー]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 1, "strDefault": 2, "intDefault": 3, "vitDefault": 3, "agiDefault": 2, "lucDefault": 3, "showDefault":false },
  "434":{  "attr":[0,0,0,0,0,0,0,0],"id": 434, "genusID":16,"name": "[ダミー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 1, "strDefault": 4, "intDefault": 4, "vitDefault": 4, "agiDefault": 6, "lucDefault": 5, "showDefault":false },
  "435":{  "attr":[0,0,0,0,0,0,0,0],"id": 435, "genusID":28,"name": "[オリアス]", "devilCost": 91, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 7, "strDefault": 14, "intDefault": 9, "vitDefault": 10, "agiDefault": 10, "lucDefault": 11, "showDefault":false },
  "436":{  "attr":[0,0,0,0,0,0,0,0],"id": 436, "genusID":28,"name": "[オリアス]", "devilCost": 91, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 7, "strDefault": 10, "intDefault": 5, "vitDefault": 7, "agiDefault": 6, "lucDefault": 7, "showDefault":false },
  "437":{  "attr":[0,0,0,0,0,0,0,0],"id": 437, "genusID":29,"name": "[オニ]", "devilCost": 93, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 7, "strDefault": 8, "intDefault": 6, "vitDefault": 6, "agiDefault": 4, "lucDefault": 7, "showDefault":false },
  "438":{  "attr":[0,0,0,0,0,0,0,0],"id": 438, "genusID":28,"name": "[メルコム]", "devilCost": 95, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 6, "strDefault": 4, "intDefault": 8, "vitDefault": 5, "agiDefault": 6, "lucDefault": 5, "showDefault":false },
  "439":{  "attr":[0,0,0,0,0,0,0,0],"id": 439, "genusID":17,"name": "[カソ]", "devilCost": 93, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 4, "strDefault": 6, "intDefault": 3, "vitDefault": 4, "agiDefault": 3, "lucDefault": 6, "showDefault":false },
  "440":{  "attr":[0,0,0,0,0,0,0,0],"id": 440, "genusID":16,"name": "[ピクシー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 2, "strDefault": 5, "intDefault": 5, "vitDefault": 4, "agiDefault": 5, "lucDefault": 7, "showDefault":false },
  "441":{  "attr":[0,0,0,0,0,0,0,0],"id": 441, "genusID":35,"name": "[ノリス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 12, "strDefault": 10, "intDefault": 10, "vitDefault": 10, "agiDefault": 10, "lucDefault": 10, "showDefault":false },
  "442":{  "attr":[0,0,0,0,0,0,0,0],"id": 442, "genusID":31,"name": "[フォーモリア]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 16, "strDefault": 11, "intDefault": 11, "vitDefault": 11, "agiDefault": 11, "lucDefault": 11, "showDefault":false },
  "443":{  "attr":[0,0,0,0,0,0,0,0],"id": 443, "genusID":34,"name": "[マカーブル]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 18, "strDefault": 11, "intDefault": 11, "vitDefault": 11, "agiDefault": 11, "lucDefault": 11, "showDefault":false },
  "444":{  "attr":[0,0,0,0,0,0,0,0],"id": 444, "genusID":29,"name": "[オニ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 7, "strDefault": 8, "intDefault": 6, "vitDefault": 6, "agiDefault": 4, "lucDefault": 7, "showDefault":false },
  "445":{  "attr":[0,0,0,0,0,0,0,0],"id": 445, "genusID":43,"name": "[ヒメネス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 4, "intDefault": 4, "vitDefault": 4, "agiDefault": 4, "lucDefault": 4, "showDefault":false },
  "446":{  "attr":[0,0,0,0,0,0,0,0],"id": 446, "genusID":45,"name": "[ゴア]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 75, "strDefault": 6, "intDefault": 3, "vitDefault": 4, "agiDefault": 3, "lucDefault": 4, "showDefault":false },
  "447":{  "attr":[0,0,0,0,0,0,0,0],"id": 447, "genusID":34,"name": "[カタチなきもの]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 22, "lucDefault": 22, "showDefault":false },
  "448":{  "attr":[0,0,0,0,0,0,0,0],"id": 448, "genusID":34,"name": "[カタチなきもの]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 22, "lucDefault": 22, "showDefault":false },
  "449":{  "attr":[0,0,0,0,0,0,0,0],"id": 449, "genusID":34,"name": "[カタチなきもの]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 22, "lucDefault": 22, "showDefault":false },
  "450":{  "attr":[0,0,0,0,0,0,0,0],"id": 450, "genusID":34,"name": "[カタチなきもの]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 22, "lucDefault": 22, "showDefault":false },
  "451":{  "attr":[0,0,0,0,0,0,0,0],"id": 451, "genusID":34,"name": "[カタチなきもの]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 30, "strDefault": 22, "intDefault": 22, "vitDefault": 22, "agiDefault": 22, "lucDefault": 22, "showDefault":false },
  "452":{  "attr":[0,0,0,0,0,0,0,0],"id": 452, "genusID":11,"name": "[マンドレイク]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 43, "strDefault": 29, "intDefault": 29, "vitDefault": 28, "agiDefault": 41, "lucDefault": 35, "showDefault":false },
  "453":{  "attr":[0,0,0,0,0,0,0,0],"id": 453, "genusID":18,"name": "[カワンチャ]", "devilCost": 92, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 43, "strDefault": 26, "intDefault": 44, "vitDefault": 29, "agiDefault": 26, "lucDefault": 26, "showDefault":false },
  "454":{  "attr":[0,0,0,0,0,0,0,0],"id": 454, "genusID":25,"name": "[ズェラロンズ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 25, "strDefault": 17, "intDefault": 16, "vitDefault": 20, "agiDefault": 19, "lucDefault": 18, "showDefault":false },
  "455":{  "attr":[0,0,0,0,0,0,0,0],"id": 455, "genusID":33,"name": "[バジリスク]", "devilCost": 88, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 33, "strDefault": 22, "intDefault": 28, "vitDefault": 17, "agiDefault": 20, "lucDefault": 22, "showDefault":false },
  "456":{  "attr":[0,0,0,0,0,0,0,0],"id": 456, "genusID":34,"name": "[なぞのあくま]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 50, "strDefault": 32, "intDefault": 33, "vitDefault": 32, "agiDefault": 31, "lucDefault": 31, "showDefault":false },
  "457":{  "attr":[0,0,0,0,0,0,0,0],"id": 457, "genusID":43,"name": "[へいし]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 48, "strDefault": 31, "intDefault": 31, "vitDefault": 31, "agiDefault": 31, "lucDefault": 31, "showDefault":false },
  "458":{  "attr":[0,0,0,0,0,0,0,0],"id": 458, "genusID":43,"name": "[へいしちょう]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 51, "strDefault": 33, "intDefault": 33, "vitDefault": 33, "agiDefault": 33, "lucDefault": 33, "showDefault":false },
  "459":{  "attr":[0,0,0,0,0,0,0,0],"id": 459, "genusID":43,"name": "[ジャック]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 50, "strDefault": 35, "intDefault": 35, "vitDefault": 35, "agiDefault": 35, "lucDefault": 35, "showDefault":false },
  "460":{  "attr":[0,0,0,0,0,0,0,0],"id": 460, "genusID":22,"name": "[グレンデル]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 49, "strDefault": 36, "intDefault": 31, "vitDefault": 33, "agiDefault": 26, "lucDefault": 31, "showDefault":false },
  "461":{  "attr":[0,0,0,0,0,0,0,0],"id": 461, "genusID":43,"name": "[ライアン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 50, "strDefault": 35, "intDefault": 35, "vitDefault": 35, "agiDefault": 35, "lucDefault": 35, "showDefault":false },
  "462":{  "attr":[0,0,0,0,0,0,0,0],"id": 462, "genusID":1,"name": "[イスラフィール]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 63, "strDefault": 38, "intDefault": 46, "vitDefault": 37, "agiDefault": 43, "lucDefault": 40, "showDefault":false },
  "463":{  "attr":[0,0,0,0,0,0,0,0],"id": 463, "genusID":32,"name": "[スルト]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 63, "strDefault": 46, "intDefault": 40, "vitDefault": 43, "agiDefault": 36, "lucDefault": 39, "showDefault":false },
  "464":{  "attr":[0,0,0,0,0,0,0,0],"id": 464, "genusID":25,"name": "[スカディ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 63, "strDefault": 46, "intDefault": 35, "vitDefault": 40, "agiDefault": 45, "lucDefault": 38, "showDefault":false },
  "465":{  "attr":[0,0,0,0,0,0,0,0],"id": 465, "genusID":43,"name": "[マクレイン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 31, "strDefault": 24, "intDefault": 24, "vitDefault": 24, "agiDefault": 24, "lucDefault": 24, "showDefault":false },
  "466":{  "attr":[0,0,0,0,0,0,0,0],"id": 466, "genusID":16,"name": "[ローレライ]", "devilCost": 95, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 31, "strDefault": 19, "intDefault": 26, "vitDefault": 19, "agiDefault": 22, "lucDefault": 17, "showDefault":false },
  "467":{  "attr":[0,0,0,0,0,0,0,0],"id": 467, "genusID":41,"name": "[マメダヌキ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 12, "strDefault": 8, "intDefault": 8, "vitDefault": 11, "agiDefault": 9, "lucDefault": 15, "showDefault":false },
  "468":{  "attr":[0,0,0,0,0,0,0,0],"id": 468, "genusID":40,"name": "[カンバリ]", "devilCost": 95, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 27, "strDefault": 21, "intDefault": 17, "vitDefault": 21, "agiDefault": 20, "lucDefault": 17, "showDefault":false },
  "469":{  "attr":[0,0,0,0,0,0,0,0],"id": 469, "genusID":39,"name": "[デイビット]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 22, "strDefault": 18, "intDefault": 18, "vitDefault": 17, "agiDefault": 18, "lucDefault": 20, "showDefault":false },
  "470":{  "attr":[0,0,0,0,0,0,0,0],"id": 470, "genusID":4,"name": "[イグドラジル]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 44, "strDefault": 36, "intDefault": 24, "vitDefault": 40, "agiDefault": 25, "lucDefault": 32, "showDefault":false },
  "471":{  "attr":[0,0,0,0,0,0,0,0],"id": 471, "genusID":4,"name": "[イグドラジル]", "devilCost": 94, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 44, "strDefault": 36, "intDefault": 24, "vitDefault": 40, "agiDefault": 25, "lucDefault": 32, "showDefault":false },
  "472":{  "attr":[0,0,0,0,0,0,0,0],"id": 472, "genusID":39,"name": "[アリス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 55, "strDefault": 36, "intDefault": 48, "vitDefault": 34, "agiDefault": 34, "lucDefault": 33, "showDefault":false },
  "473":{  "attr":[0,0,0,0,0,0,0,0],"id": 473, "genusID":39,"name": "[マザーハーロット]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 93, "strDefault": 60, "intDefault": 67, "vitDefault": 58, "agiDefault": 56, "lucDefault": 58, "showDefault":false },
  "474":{  "attr":[0,0,0,0,0,0,0,0],"id": 474, "genusID":1,"name": "[ハニエル]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 44, "strDefault": 28, "intDefault": 36, "vitDefault": 29, "agiDefault": 33, "lucDefault": 31, "showDefault":false },
  "475":{  "attr":[0,0,0,0,0,0,0,0],"id": 475, "genusID":1,"name": "[カズフェル]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 44, "strDefault": 33, "intDefault": 32, "vitDefault": 29, "agiDefault": 32, "lucDefault": 31, "showDefault":false },
  "476":{  "attr":[0,0,0,0,0,0,0,0],"id": 476, "genusID":1,"name": "[ハニエル]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 66, "strDefault": 41, "intDefault": 50, "vitDefault": 42, "agiDefault": 46, "lucDefault": 44, "showDefault":false },
  "477":{  "attr":[0,0,0,0,0,0,0,0],"id": 477, "genusID":1,"name": "[カズフェル]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 64, "strDefault": 45, "intDefault": 44, "vitDefault": 41, "agiDefault": 44, "lucDefault": 43, "showDefault":false },
  "478":{  "attr":[0,0,0,0,0,0,0,0],"id": 478, "genusID":27,"name": "[ゾウチョウテン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 39, "strDefault": 31, "intDefault": 26, "vitDefault": 28, "agiDefault": 30, "lucDefault": 27, "showDefault":false },
  "479":{  "attr":[0,0,0,0,0,0,0,0],"id": 479, "genusID":27,"name": "[コウモクテン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 46, "strDefault": 34, "intDefault": 33, "vitDefault": 33, "agiDefault": 33, "lucDefault": 30, "showDefault":false },
  "480":{  "attr":[0,0,0,0,0,0,0,0],"id": 480, "genusID":27,"name": "[ジコクテン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 66, "strDefault": 47, "intDefault": 43, "vitDefault": 42, "agiDefault": 46, "lucDefault": 45, "showDefault":false },
  "481":{  "attr":[0,0,0,0,0,0,0,0],"id": 481, "genusID":27,"name": "[ビシャモンテン]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 67, "strDefault": 44, "intDefault": 45, "vitDefault": 48, "agiDefault": 44, "lucDefault": 45, "showDefault":false },
  "482":{  "attr":[0,0,0,0,0,0,0,0],"id": 482, "genusID":1,"name": "[セラフ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 90, "strDefault": 52, "intDefault": 64, "vitDefault": 54, "agiDefault": 56, "lucDefault": 59, "showDefault":false },
  "483":{  "attr":[0,0,0,0,0,0,0,0],"id": 483, "genusID":32,"name": "[マーラ]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 80, "strDefault": 54, "intDefault": 55, "vitDefault": 52, "agiDefault": 53, "lucDefault": 51, "showDefault":false },
  "484":{  "attr":[0,0,0,0,0,0,0,0],"id": 484, "genusID":48,"name": "[アリラト]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 87, "strDefault": 58, "intDefault": 57, "vitDefault": 57, "agiDefault": 57, "lucDefault": 57, "showDefault":false },
  "485":{  "attr":[0,0,0,0,0,0,0,0],"id": 485, "genusID":9,"name": "[デミウルゴス]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 99, "strDefault": 72, "intDefault": 72, "vitDefault": 72, "agiDefault": 72, "lucDefault": 72, "showDefault":false },
  "486":{  "attr":[0,0,0,0,0,0,0,0],"id": 486, "genusID":39,"name": "[ホワイトライダー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 49, "strDefault": 37, "intDefault": 31, "vitDefault": 33, "agiDefault": 38, "lucDefault": 33, "showDefault":false },
  "487":{  "attr":[0,0,0,0,0,0,0,0],"id": 487, "genusID":39,"name": "[レッドライダー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 59, "strDefault": 39, "intDefault": 41, "vitDefault": 40, "agiDefault": 43, "lucDefault": 39, "showDefault":false },
  "488":{  "attr":[0,0,0,0,0,0,0,0],"id": 488, "genusID":39,"name": "[ブラックライダー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 69, "strDefault": 45, "intDefault": 49, "vitDefault": 43, "agiDefault": 50, "lucDefault": 45, "showDefault":false },
  "489":{  "attr":[0,0,0,0,0,0,0,0],"id": 489, "genusID":39,"name": "[ペイルライダー]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 78, "strDefault": 53, "intDefault": 49, "vitDefault": 51, "agiDefault": 54, "lucDefault": 52, "showDefault":false },
  "490":{  "attr":[0,0,0,0,0,0,0,0],"id": 490, "genusID":39,"name": "[トランペッター]", "devilCost": 96, "baseHP": 100, "HP": 25, "baseMP": 100, "MP": 13, "skillDefault": [0, 0, 0, 0, 0,0], "lvDefault": 88, "strDefault": 56, "intDefault": 58, "vitDefault": 57, "agiDefault": 57, "lucDefault": 63,"showDefault":false }
};//}}}

function createDevilMap(json){
  var devilMap = [];//{{{
  for (value in json) {
    devilMap[value] = new Devil(json[value]);
  }
  return devilMap;//}}}
}
// 悪魔
var devilMap = createDevilMap(devilJSON);

var indexMap      = new Array();
//{{{
indexMap[0]   = [21,19,9,15,17,12,10,2,13,11,16,18,7,8,20,6,1,3,4,14,5,0];
indexMap[2]   = [20,15,17,5,10,13,18,8,4,6,3,14,12,21,7,16,19,2,9,0,11,1];
indexMap[6]   = [5,17,12,9,21,13,19,3,14,10,1,8,7,20,2,11,18,16,6,15,4,0];
indexMap[11]  = [13,16,11,6,7,19,2,20,14,8,10,5,9,1,0,18,21,4,15,12,3,17];
indexMap[16]  = [20,14,16,13,21,17,0,9,10,4,7,2,19,12,3,18,15,5,1,6,11,8];
indexMap[17]  = [20,5,17,21,11,16,9,14,13,7,0,3,15,18,2,6,8,4,19,12,10,1];
indexMap[28]  = [21,20,15,17,16,18,12,19,14,13,8,10,9,0,1,5,7,11,2,6,3,4];
indexMap[29]  = [12,19,16,9,20,15,10,21,1,17,5,14,7,8,6,4,18,13,3,11,2,0];
indexMap[32]  = [19,14,12,17,20,9,10,5,21,13,0,6,3,2,1,18,15,8,7,4,11,16];
indexMap[36]  = [16,7,9,18,17,13,15,8,19,10,11,20,6,14,2,21,3,0,5,12,1,4];
indexMap[37]  = [13,19,3,17,11,16,15,1,8,9,18,10,20,7,5,6,21,2,12,0,4,14];
indexMap[48]  = [20,8,18,7,13,15,17,12,16,10,14,4,9,21,2,5,3,11,0,1,19,6];
indexMap[53]  = [18,20,11,17,15,16,9,1,13,7,12,5,21,3,19,10,4,6,8,14,0,2];
indexMap[55]  = [15,16,12,13,0,20,21,10,6,5,11,19,2,8,9,4,14,18,17,7,3,1];
indexMap[57]  = [15,21,18,14,16,10,19,20,17,13,11,8,9,5,7,3,4,12,0,2,1,6];
indexMap[58]  = [15,18,14,12,16,8,20,13,5,4,21,3,2,10,17,11,19,6,1,9,0,7];
indexMap[59]  = [15,13,16,12,19,14,21,9,10,17,3,6,7,2,4,5,20,18,8,1,0,11];
indexMap[66]  = [15,14,17,19,11,16,20,13,21,8,10,18,9,5,3,1,12,7,4,0,6,2];
indexMap[77]  = [20,3,19,16,15,18,10,14,13,12,11,7,9,6,17,1,2,5,21,4,0,8];
indexMap[79]  = [14,13,8,19,11,1,3,10,2,0,4,18,16,20,7,5,6,12,17,21,15,9];
indexMap[81]  = [10,13,17,9,21,12,5,8,16,11,20,19,18,4,3,2,15,1,6,0,14,7];
indexMap[86]  = [19,20,11,17,21,18,5,14,4,7,16,8,9,12,15,0,3,13,2,10,1,6];
indexMap[87]  = [14,13,17,11,10,20,9,6,12,7,2,19,1,15,4,21,5,16,18,3,0,8];
indexMap[88]  = [21,20,13,16,11,6,10,14,12,15,4,19,9,8,7,18,2,3,17,5,1,0];
indexMap[91]  = [15,6,10,18,17,21,14,20,9,12,3,16,13,4,8,5,19,1,2,7,11,0];
indexMap[97]  = [20,11,18,17,15,8,13,9,12,14,10,19,21,6,2,3,0,16,5,4,1,7];
indexMap[98]  = [14,3,13,17,15,7,12,21,5,19,16,1,10,8,11,2,18,0,20,6,4,9];
indexMap[100] = [17,14,18,13,12,15,5,8,21,9,10,2,19,7,20,3,11,16,0,4,6,1];
indexMap[105] = [10,13,17,16,9,18,14,3,12,2,15,19,20,1,8,4,0,5,11,21,6,7];
indexMap[116] = [14,13,19,1,9,16,5,11,4,18,21,10,7,6,2,15,8,20,3,17,12,0];
indexMap[118] = [18,13,15,20,21,10,9,8,17,12,11,19,1,4,5,7,3,14,2,0,16,6];
indexMap[123] = [15,4,16,11,17,20,6,8,3,10,18,12,13,0,9,21,5,19,2,7,1,14];
indexMap[132] = [17,14,5,18,21,8,11,20,19,6,15,13,4,10,1,0,16,12,3,2,9,7];
indexMap[133] = [17,13,20,16,3,18,15,10,19,12,11,14,21,9,7,1,5,4,8,6,2,0];
indexMap[136] = [17,14,3,15,6,0,18,5,7,12,1,4,19,2,20,21,13,16,9,8,10,11];
indexMap[138] = [19,6,18,14,21,16,1,15,3,10,11,13,12,0,7,17,9,4,8,2,20,5];
indexMap[140] = [20,18,19,14,17,6,15,9,10,2,7,4,21,13,1,5,16,12,0,8,11,3];
indexMap[144] = [19,3,18,13,17,14,5,12,16,9,0,10,4,11,1,6,2,20,21,7,8,15];
indexMap[151] = [11,18,21,8,19,20,16,4,10,3,9,0,14,17,5,13,1,15,6,7,12,2];
indexMap[152] = [17,16,15,18,21,11,19,14,20,12,13,7,9,8,10,6,3,5,4,1,2,0];
indexMap[160] = [20,21,17,7,12,13,11,8,16,10,14,6,4,19,5,15,9,0,2,1,18,3];
indexMap[162] = [9,21,19,17,15,11,10,4,2,3,8,20,16,5,1,13,18,0,12,14,6,7];
indexMap[163] = [18,7,14,9,2,17,20,13,16,21,19,6,5,10,4,1,12,15,0,11,3,8];
indexMap[164] = [21,13,19,4,17,16,14,12,11,20,15,18,5,0,6,2,1,10,3,9,7,8];
indexMap[166] = [21,5,19,9,18,14,8,16,17,11,2,20,13,12,0,15,10,3,1,7,4,6];
indexMap[169] = [18,16,10,6,15,11,21,14,12,20,17,2,5,4,13,7,0,1,19,8,9,3];
indexMap[170] = [13,15,19,8,1,16,11,21,12,7,14,3,5,18,20,10,4,2,0,6,17,9];
indexMap[172] = [20,17,11,10,16,18,14,9,2,15,21,19,5,1,6,0,4,12,7,3,8,13];
indexMap[175] = [19,12,18,5,17,21,3,7,10,16,1,13,9,8,15,6,20,4,0,2,11,14];
indexMap[176] = [13,10,19,20,17,16,15,14,21,4,6,8,7,18,11,5,9,1,2,12,3,0];
indexMap[179] = [19,16,7,14,17,21,18,9,4,12,6,3,13,5,20,8,11,15,1,2,10,0];
indexMap[181] = [10,19,20,14,16,17,4,0,5,7,2,12,8,9,13,15,21,3,6,11,1,18];
indexMap[183] = [21,14,18,17,16,19,0,9,11,10,12,13,8,5,4,15,20,1,3,6,7,2];
indexMap[184] = [21,17,15,9,20,10,11,14,13,19,16,12,7,8,1,18,2,4,3,0,6,5];
indexMap[186] = [15,18,5,16,14,19,7,10,6,1,0,8,9,17,21,3,20,4,11,2,12,13];
indexMap[196] = [16,13,21,9,8,19,7,12,14,17,10,11,20,5,2,3,18,6,15,1,0,4];
indexMap[201] = [18,15,19,14,20,5,10,17,1,21,12,7,2,3,6,11,9,8,13,0,16,4];
indexMap[209] = [14,19,21,10,17,15,9,4,20,18,3,13,6,5,8,12,1,16,7,11,0,2];
indexMap[211] = [19,21,9,16,13,20,15,11,17,12,14,1,18,7,10,4,5,8,0,3,6,2];
indexMap[215] = [15,5,7,12,1,8,20,13,4,11,16,9,2,19,18,17,21,10,6,14,0,3];
indexMap[217] = [13,20,7,9,18,17,16,14,15,11,5,12,8,3,1,6,19,2,21,0,4,10];
indexMap[219] = [10,8,15,18,20,13,12,2,0,11,7,17,5,6,21,19,4,14,9,1,3,16];
indexMap[221] = [16,21,18,12,17,1,11,9,15,8,14,4,20,7,5,13,2,0,19,10,6,3];
indexMap[225] = [12,21,16,19,7,8,0,2,4,11,6,1,17,20,3,18,10,5,14,15,9,13];
indexMap[227] = [13,18,6,11,9,10,3,14,21,12,7,16,17,8,1,20,15,2,0,4,19,5];
indexMap[229] = [13,8,2,10,16,17,3,5,11,12,19,20,21,9,1,4,6,15,0,18,14,7];
indexMap[236] = [21,15,17,18,16,6,11,12,13,8,19,20,14,7,4,5,10,3,1,9,0,2];
indexMap[240] = [11,17,13,7,16,15,19,21,14,6,18,3,5,12,20,2,4,10,0,1,9,8];
indexMap[243] = [20,21,18,15,16,13,7,17,14,12,11,5,4,6,2,9,10,3,8,19,1,0];
indexMap[244] = [15,21,10,18,12,17,16,6,14,19,11,20,4,9,1,13,0,2,7,3,8,5];
indexMap[245] = [14,17,12,9,19,15,13,20,5,21,11,6,18,7,8,16,3,4,10,1,2,0];
indexMap[252] = [16,14,8,0,19,12,20,13,21,5,9,7,3,15,2,4,17,1,6,11,18,10];
indexMap[254] = [21,19,17,12,18,5,15,9,7,8,4,16,14,1,13,6,2,11,3,0,20,10];//}}}

var charMap = "し,ん,い,く,み,Ｂ,や,る,Ｙ,け,ひ,Ｋ,Ｆ,と,Ｈ,む,Ａ,ち,に,Ｚ,き,Ｗ,よ,Ｌ,を,の,た,れ,Ｎ,え,Ｓ,ふ,わ,Ｊ,そ,り,す,Ｃ,め,Ｐ,へ,Ｑ,Ｇ,Ｒ,Ｄ,こ,Ｍ,Ｔ,ま,つ,せ,か,は,Ｅ,Ｕ,て,さ,な,あ,も,ゆ,お,う,ろ".split(",");

var letters = "しんいくみＢやるＹけひＫＦとＨむＡちにＺきＷよＬをのたれＮえＳふわＪそりすＣめＰへＱＧＲＤこＭＴまつせかはＥＵてさなあもゆおうろ";

var currentPatternID = null;

function setPattern(patternID) {
  currentPatternID = patternID;
}

var expTable = {
  "0":4 ,//{{{
  "1":12 ,
  "2":27 ,
  "3":57 ,
  "4":106 ,
  "5":178 ,
  "6":280 ,
  "7":415 ,
  "8":589 ,
  "9":806 ,
  "10":1070 ,
  "11":1388 ,
  "12":1763 ,
  "13":2201 ,
  "14":2706 ,
  "15":3282 ,
  "16":3936 ,
  "17":4671 ,
  "18":5493 ,
  "19":6406 ,
  "20":7414 ,
  "21":8524 ,
  "22":9739 ,
  "23":11065 ,
  "24":12506 ,
  "25":14066 ,
  "26":15752 ,
  "27":17567 ,
  "28":19517 ,
  "29":21606 ,
  "30":23838 ,
  "31":26220 ,
  "32":28755 ,
  "33":31449 ,
  "34":34306 ,
  "35":37330 ,
  "36":40528 ,
  "37":43903 ,
  "38":47461 ,
  "39":51206 ,
  "40":55142 ,
  "41":59276 ,
  "42":63611 ,
  "43":68153 ,
  "44":72906 ,
  "45":77874 ,
  "46":83064 ,
  "47":88479 ,
  "48":94125 ,
  "49":100006 ,
  "50":106126 ,
  "51":112492 ,
  "52":119107 ,
  "53":125977 ,
  "54":133106 ,
  "55":136802 ,
  "56":140633 ,
  "57":144601 ,
  "58":148708 ,
  "59":152957 ,
  "60":157349 ,
  "61":161888 ,
  "62":166576 ,
  "63":168996 ,
  "64":171492 ,
  "65":174066 ,
  "66":176720 ,
  "67":179454 ,
  "68":182270 ,
  "69":185168 ,
  "70":188129 ,
  "71":191132 ,
  "72":194178 ,
  "73":197267 ,
  "74":200399 ,
  "75":203575 ,
  "76":206795 ,
  "77":210059 ,
  "78":213367 ,
  "79":216720 ,
  "80":220118 ,
  "81":223561 ,
  "82":227050 ,
  "83":230585 ,
  "84":234166 ,
  "85":237793 ,
  "86":241467 ,
  "87":245188 ,
  "88":248956 ,
  "89":252773 ,
  "90":256637 ,
  "91":260549 ,
  "92":264510 ,
  "93":268520 ,
  "94":272579 ,
  "95":276688 ,
  "96":280847 ,
  "97":285056 ,
  "98":289315 ,
  "99":0//}}}
}
var expBaseScaleFactor = [
  1 ,1.2 ,1.44 ,1.72 ,1.94 ,2.18 ,2.46 ,2.78 ,3.14 ,3.54 ,4
];

// 準備 OK フラグ
var isReady = false;


// -------------------------------------------------------------------------------------------------
// 処理
// -------------------------------------------------------------------------------------------------
// 初期化処理
function init() {
  //{{{
  document.foMain.taOut.value = "初期化中 ...";

  var i;
  
  // パターン初期化
  for ( i in indexMap ) {
    if ( indexMap[i] != undefined ) {
      var len = document.foMain.slPattern.options.length;
      document.foMain.slPattern.options[len] = new Option(i, i);
    }
  }
  document.foMain.slPattern.selectedIndex = 46;
  setPattern(170);
  
  // 能力値リスト初期化
  for ( i = 1; i < 100; i++ ) {
    var len = document.foMain.slLv.options.length;
    document.foMain.slLv.options[len]      = new Option(i, i);
    document.foMain.slStr.options[len]     = new Option(i, i);
    document.foMain.slInt.options[len]     = new Option(i, i);
    document.foMain.slVit.options[len]     = new Option(i, i);
    document.foMain.slAgi.options[len]     = new Option(i, i);
    document.foMain.slLuc.options[len]     = new Option(i, i);
    document.foMain.slStrBase.options[len] = new Option(i, i);
    document.foMain.slIntBase.options[len] = new Option(i, i);
    document.foMain.slVitBase.options[len] = new Option(i, i);
    document.foMain.slAgiBase.options[len] = new Option(i, i);
    document.foMain.slLucBase.options[len] = new Option(i, i);
  }
  
  // 経験値フィールド初期化
  document.foMain.txExp.value = "0";
  
  createSkillSelectOptions(); 
  
  // 悪魔リスト初期化
  createDevilOptions();

  
  document.foMain.taOut.value = "初期化完了。";
  isReady = true;
}//}}}

/**
 * 敵専用チェックボックスを変更した際に呼ぶ関数です。
 * 悪魔リストとスキルリストに敵専用のモノを追加や除去します。
 */ 
function changeEnemyExclusive() {
  createDevilOptions();
  createSkillSelectOptions();
}

/**
 * 悪魔リストを生成します。
 * 敵専用チェックボックスがチェックされている場合、
 * 敵専用のモノを追加します。
 */
function createDevilOptions (){
  //{{{
  
  // リストを空にしてから追加しないと重複してしまう
  for (var i=0 ,len = document.foMain.slDevil.options.length; i < len; i++) {
    document.foMain.slDevil.options.remove();
  }
  
  for ( i in devilMap ) {
    var devil = devilMap[i];
    if(devil.showDefault){
      var len = document.foMain.slDevil.options.length;
      document.foMain.slDevil.options[len] = new Option(devil.toString(), devil.devilID);
    } else if(document.foMain.enemyExclusive.checked){
      document.foMain.slDevil.options[len] = new Option(devil.toString(), devil.devilID);
    }
  }
  //}}}
}

/**
 * スキルドロップダウンを生成します。
 * 敵専用チェックボックスがチェックされている場合、
 * 敵専用のモノを追加します。
 */
function createSkillSelectOptions() {
  var isSkillDemonikaModoki = function (skillID) {
    return skillID == 228//{{{
    || skillID == 231
    || skillID == 240
    || skillID == 241
    || skillID == 243
    //}}}
  }

  
  // スキルリスト初期化
  var deleteOptions = function (options) {
    for (var i=0 ,len = options.length; i < len; i++) {
      options.remove();
   }
  }
  
  //***********  処理開始
  deleteOptions(document.foMain.slSkill0.options);
  deleteOptions(document.foMain.slSkill1.options);
  deleteOptions(document.foMain.slSkill2.options);
  deleteOptions(document.foMain.slSkill3.options);
  deleteOptions(document.foMain.slSkill4.options);
  deleteOptions(document.foMain.slSkill5.options);
  
  // 追加する
  for ( i in skillMap ) {
    var skill = skillMap[i];
    if (skill.cost != -1 
        || isSkillDemonikaModoki(skill.skillID)
        || document.foMain.enemyExclusive.checked 
            //敵専用スキルにチェックが入っていたら全て表示する
       ) {
         var len = document.foMain.slSkill1.options.length;
            
         document.foMain.slSkill0.options[len] = new Option(skill.toDetailString(), skill.skillID);
         
         document.foMain.slSkill1.options[len] = new Option(skill.toDetailString(), skill.skillID);
         document.foMain.slSkill2.options[len] = new Option(skill.toDetailString(), skill.skillID);
         document.foMain.slSkill3.options[len] = new Option(skill.toDetailString(), skill.skillID);
         document.foMain.slSkill4.options[len] = new Option(skill.toDetailString(), skill.skillID);
         document.foMain.slSkill5.options[len] = new Option(skill.toDetailString(), skill.skillID);
         var costStr = skill.toStringCost();
         document.foMain.slSkill0.options[len].title = costStr;
         document.foMain.slSkill1.options[len].title = costStr;
         document.foMain.slSkill2.options[len].title = costStr;
         document.foMain.slSkill3.options[len].title = costStr;
         document.foMain.slSkill4.options[len].title = costStr;
         document.foMain.slSkill5.options[len].title = costStr;
       }
  }
}


/**
 * 
 */
function toggleStatusMaxMin(select) {
  //{{{
  MAX = select.length-1;
  MIN = 0;
  
  select.selectedIndex == 98 ? 
    select.selectedIndex = MIN 
  : select.selectedIndex = MAX;
  
}//}}}
/**
 * 活泉・魔脈スキルによるHP・MPの増加分%を返します。
 */
function getHPMPupParcent(skillID) {
  //{{{
  switch (parseInt(skillID)) {
    case 414:
      return {"target":"hp","parcent":0.1};
    case 417:
      return {"target":"mp","parcent":0.1};
    case 415:
      return {"target":"hp","parcent":0.2};
    case 418:
      return {"target":"mp","parcent":0.2};
    case 416:
      return {"target":"hp","parcent":0.3};
    case 419:
      return {"target":"mp","parcent":0.3};
  }
  return {"target":"none","parcent":0};
}//}}}

/**
 * 
 */
function calcHPMPParcent(skillList) {
  //{{{
  var result = {"totalHPParcent":1,"totalMPParcent":1};
  
  for (var i=0,len = skillList.length ; i < len;i++) {
    var upPatcent = getHPMPupParcent(skillList[i]);
    switch (upPatcent.target){
      case "hp":
        result.totalHPParcent = result.totalHPParcent + upPatcent.parcent;
      break;
      case "mp":
        result.totalMPParcent = result.totalMPParcent + upPatcent.parcent;
      break;
    }
  };
  return result;
}//}}}
/*
 *
 */
function calculateHP(lv,vit,addNum,upHPPercent,skillList) {
  //{{{
  var resultHP = Math.floor(lv*6 + vit*3*upHPPercent/100 + addNum );
  resultHP = Math.floor(resultHP * calcHPMPParcent(skillList).totalHPParcent) ;
  if (resultHP > 999) {
    resultHP = 999;
  }
  return resultHP;
}
//}}}
function calculateMP(lv,int,addNum,upMPpercent,skillList) {
  //{{{
  var resultMP = Math.floor(lv*3 + int*2*upMPpercent/100 + addNum);
  resultMP = Math.floor(resultMP * calcHPMPParcent(skillList).totalMPParcent);
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
  var devilID    = document.foMain.slDevil.options[document.foMain.slDevil.selectedIndex].value;
  
  // 悪魔 ID に対応する悪魔オブジェクトの複製を取得
  var devil      = getDevil(devilID).clone();
  
  // ステータスをセット
  document.foMain.slLv.value = devil.lv;
  document.foMain.txExp.value = devil.exp;
  
  // 能力値・実値
  document.foMain.slStr.value = devil.str;
  document.foMain.slInt.value = devil.int;
  document.foMain.slVit.value = devil.vit;
  document.foMain.slAgi.value = devil.agi;
  document.foMain.slLuc.value = devil.luc;
  // 
  // 能力値・基準値
  devil = setStatusBase(devil);
  
  // スキル
  document.foMain.slSkill0.value = devil.skill[0];
  document.foMain.slSkill1.value = devil.skill[1];
  document.foMain.slSkill2.value = devil.skill[2];
  document.foMain.slSkill3.value = devil.skill[3];
  document.foMain.slSkill4.value = devil.skill[4];
  document.foMain.slSkill5.value = devil.skill[5];

  devil.HP = calculateHP(devil.lv,devil.vit,devil.addHP,devil.baseHP,devil.skill);
  devil.MP = calculateMP(devil.lv,devil.int,devil.addMP,devil.baseHP,devil.skill);
  
  setEXPMax(devil);
  
  // 悪魔情報を取得して表示
  document.foMain.taOut.value = devil.getSimpleInformation();
  //}}}
};

// 入力値更新時の処理
function doRefresh() {
  //{{{
  if ( !isReady ) {
    return;
  }
  
  // パターンのセット
  setPattern(eval(document.foMain.slPattern.options[document.foMain.slPattern.selectedIndex].value));
  
  // 悪魔 ID の入力値を取得
  var devilID    = document.foMain.slDevil.options[document.foMain.slDevil.selectedIndex].value;
  
  // 悪魔 ID に対応する悪魔オブジェクトの複製を取得
  var devil      = getDevil(devilID).clone();
  
  setEXPMax(devil);
  
  // ステータスをセット
  devil.lv       = document.foMain.slLv.options[document.foMain.slLv.selectedIndex].value;
  devil.exp      = document.foMain.txExp.value;
  
  // 能力値・実値
  devil.str      = document.foMain.slStr.options[document.foMain.slStr.selectedIndex].value;
  devil.int      = document.foMain.slInt.options[document.foMain.slInt.selectedIndex].value;
  devil.vit      = document.foMain.slVit.options[document.foMain.slVit.selectedIndex].value;
  devil.agi      = document.foMain.slAgi.options[document.foMain.slAgi.selectedIndex].value;
  devil.luc      = document.foMain.slLuc.options[document.foMain.slLuc.selectedIndex].value;
  
  devil = setStatusBase(devil);
  
  // スキル
  devil.skill[0] = document.foMain.slSkill0.options[document.foMain.slSkill0.selectedIndex].value;
  devil.skill[1] = document.foMain.slSkill1.options[document.foMain.slSkill1.selectedIndex].value;
  devil.skill[2] = document.foMain.slSkill2.options[document.foMain.slSkill2.selectedIndex].value;
  devil.skill[3] = document.foMain.slSkill3.options[document.foMain.slSkill3.selectedIndex].value;
  devil.skill[4] = document.foMain.slSkill4.options[document.foMain.slSkill4.selectedIndex].value;
  devil.skill[5] = document.foMain.slSkill5.options[document.foMain.slSkill5.selectedIndex].value;

  devil.HP = calculateHP(devil.lv,devil.vit,devil.addHP,devil.baseHP,devil.skill);
  devil.MP = calculateMP(devil.lv,devil.int,devil.addMP,devil.baseHP,devil.skill);
  
  
  // 悪魔情報を取得して表示
  document.foMain.taOut.value = devil.getSimpleInformation();
//}}}
}

/**
 * 能力値基準値を画面へ設定します。
 * @param {Devil} devil データの入った悪魔クラス
 */
function setStatusBase(devil) {
  // 能力値・基準値
  if ( document.foMain.cbBaseEqReal.checked ) {
    // 「□実値と同じ値を使う」チェックボックスがチェックされている場合
    devil.strBase  = devil.str;
    devil.intBase  = devil.int;
    devil.vitBase  = devil.vit;
    devil.agiBase  = devil.agi;
    devil.lucBase  = devil.luc;
  }
  else {
    // 「■実値と同じ値を使う」チェックボックスがチェックされていない場合
    devil.strBase  = document.foMain.slStrBase.options[document.foMain.slStrBase.selectedIndex].value;
    devil.intBase  = document.foMain.slIntBase.options[document.foMain.slIntBase.selectedIndex].value;
    devil.vitBase  = document.foMain.slVitBase.options[document.foMain.slVitBase.selectedIndex].value;
    devil.agiBase  = document.foMain.slAgiBase.options[document.foMain.slAgiBase.selectedIndex].value;
    devil.lucBase  = document.foMain.slLucBase.options[document.foMain.slLucBase.selectedIndex].value;
  }
  return devil;
}

/**
 * 最大経験値を画面に設定します。
 * @param {Devil} devil データの入った悪魔クラス
 */
function setEXPMax(devil) {
  devil.calculateEXPMax();
  document.foMain.txExp.max = devil.expMax;
  document.getElementById('exp-max').innerHTML = devil.expMax;
  if (parseInt(document.foMain.txExp.value) > parseInt(devil.expMax)) {
    document.foMain.txExp.value = devil.expMax;
  }
  if (parseInt(document.foMain.txExp.value) < 0) {
    document.foMain.txExp.value = 0;
  }
}
// パスワード入力ボタン押下時の処理
function doInput() {//{{{
  if ( !isReady ) {
    return;
  }
  
  var password = document.foMain.taIn.value;
  while ( password.indexOf("\n") != -1 ) {
    password = password.replace("\n", "");
  }
  
  var msg;
  // 文字モード
  if ( document.getElementById("rbCharMode").checked ) {
    password = password.toUpperCase();
    msg = analyzeCharPassword(password);
  }
  // ビットモード
  else {
    msg = analyzeBitPassword(password);
  }
  
  document.foMain.taOut.value = msg;
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
  if ( password.length < 31 ) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードは無効です。";
    msg += "\n";
    msg += "パスワードは 31 文字以上入力してください。";
    msg += "\n";
    return msg;
  }
  // 32 文字を超える場合、警告
  else if ( password.length > 32 ) {
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
  for ( i = 0; i < 31; i++ ) {
    var char = password.charAt(i);
    var value = letters.indexOf(char);
    
    // 不正な文字の検出
    if ( value == -1 ) {
      msg += "ERROR.";
      msg += "\n";
      msg += "入力されたパスワードは無効です。";
      msg += "\n";
      msg += "不正な文字が含まれています。(" + (i + 1) + "文字目：'" + char +"')";
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
  if ( password.length < 184 ) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードは無効です。";
    msg += "\n";
    msg += "ビットモードのパスワードは 184 ビット以上入力してください。";
    msg += "\n";
    return msg;
  }
  // 192 文字を超える場合、警告
  else if ( password.length > 192 ) {
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
  for ( i = 0; i < 184; i++ ) {
    var char = password.charAt(i);
    if ( char != "0" && char != "1" ) {
      msg += "ERROR.";
      msg += "\n";
      msg += "入力されたパスワードは無効です。";
      msg += "\n";
      msg += "不正な文字が含まれています。(" + (i + 1) + "文字目：'" + char +"')";
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
  for ( i = 0; i < 24; i++ ) {
    srcBytes[i] = 0;
  }
  for ( i = 0; i < 22; i++ ) {
    srcBytes[i] = parseInt(src.substr(i * 8, 8), 2);
    // マスク値と XOR
    srcBytes[i] ^= mask;
  }
  srcBytes[22] = mask;
  
  // 未対応パターンならエラー
  if ( indexMap[mask] == undefined ) {
    msg += "ERROR.";
    msg += "\n";
    msg += "入力されたパスワードパターンは未対応です。";
    msg += "\n";
    // デバッグモード時のみデバッグ情報を付加
    if ( document.foMain.cbDebugMode.checked ) {
      msg += "入力されたバイト列 : ";
      msg += "\n";
      for ( i = 0; i < 23; i++ ) {
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
  for ( i = 0; i < 24; i++ ) {
    dstBytes[i] = 0;
  }
  // バイト単位で移送
  for ( i = 0; i < 22; i++ ) {
    dstBytes[i] = srcBytes[indexMap[currentPatternID][i]];
  }
  
  // 移送後バイト配列をビット文字列に変換
  var dst = "";
  for ( i = 0; i < 24; i++ ) {
    dst += fillZero(8, eval(dstBytes[i]).toString(2))
  }
  
  // 各ステータス値に分割
  var skill   = new Array();
  var devilID = parseInt(dst.substr(  4,  9), 2);
  var lv      = parseInt(dst.substr( 13,  7), 2);
  skill[5]    = parseInt(dst.substr( 20,  9), 2);
  skill[4]    = parseInt(dst.substr( 29,  9), 2);
  skill[3]    = parseInt(dst.substr( 38,  9), 2);
  skill[2]    = parseInt(dst.substr( 47,  9), 2);
  skill[1]    = parseInt(dst.substr( 56,  9), 2);
  skill[0]    = parseInt(dst.substr( 65,  9), 2);
  var exp     = parseInt(dst.substr( 74, 32), 2);
  var intBase = parseInt(dst.substr(106,  7), 2);
  var lucBase = parseInt(dst.substr(113,  7), 2);
  var agiBase = parseInt(dst.substr(120,  7), 2);
  var vitBase = parseInt(dst.substr(127,  7), 2);
  var strBase = parseInt(dst.substr(134,  7), 2);
  var int     = parseInt(dst.substr(141,  7), 2);
  var luc     = parseInt(dst.substr(148,  7), 2);
  var agi     = parseInt(dst.substr(155,  7), 2);
  var vit     = parseInt(dst.substr(162,  7), 2);
  var str     = parseInt(dst.substr(169,  7), 2);
  
  // 有効範囲チェックをしながらフォームに適用
  // 悪魔ID (1 ～ 490)
  msg += "悪魔ID      = " + devilID;
  if ( 1 <= devilID && devilID <= 490 ) {
    document.foMain.slDevil.selectedIndex = devilID - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // Lv (1 ～ 99)
  msg += "Lv          = " + lv;
  if ( 1 <= lv && lv <= 99 ) {
    document.foMain.slLv.selectedIndex = lv - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 経験値 (0 ～ 2097151)
  msg += "経験値      = " + exp;
  if ( 0 <= exp && exp <= 2097151 ) {
    document.foMain.txExp.value = exp;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (実値) (1 ～ 99)
  msg += "力 (実値)   = " + str;
  if ( 1 <= str && str <= 99 ) {
    document.foMain.slStr.selectedIndex = str - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (実値) (1 ～ 99)
  msg += "魔 (実値)   = " + int;
  if ( 1 <= int && int <= 99 ) {
    document.foMain.slInt.selectedIndex = int - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (実値) (1 ～ 99)
  msg += "体 (実値)   = " + vit;
  if ( 1 <= vit && vit <= 99 ) {
    document.foMain.slVit.selectedIndex = vit - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (実値) (1 ～ 99)
  msg += "速 (実値)   = " + agi;
  if ( 1 <= agi && agi <= 99 ) {
    document.foMain.slAgi.selectedIndex = agi - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (実値) (1 ～ 99)
  msg += "運 (実値)   = " + luc;
  if ( 1 <= luc && luc <= 99 ) {
    document.foMain.slLuc.selectedIndex = luc - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 力 (基準値) (1 ～ 99)
  msg += "力 (基準値) = " + strBase;
  if ( 1 <= strBase && strBase <= 99 ) {
    document.foMain.slStrBase.selectedIndex = strBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 魔 (基準値) (1 ～ 99)
  msg += "魔 (基準値) = " + intBase;
  if ( 1 <= intBase && intBase <= 99 ) {
    document.foMain.slIntBase.selectedIndex = intBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 体 (基準値) (1 ～ 99)
  msg += "体 (基準値) = " + vitBase;
  if ( 1 <= vitBase && vitBase <= 99 ) {
    document.foMain.slVitBase.selectedIndex = vitBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 速 (基準値) (1 ～ 99)
  msg += "速 (基準値) = " + agiBase;
  if ( 1 <= agiBase && agiBase <= 99 ) {
    document.foMain.slAgiBase.selectedIndex = agiBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // 運 (基準値) (1 ～ 99)
  msg += "運 (基準値) = " + lucBase;
  if ( 1 <= lucBase && lucBase <= 99 ) {
    document.foMain.slLucBase.selectedIndex = lucBase - 1;
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[1] (0 ～ 419)
  msg += "スキル[1]   = " + skill[0];
  if ( 0 <= skill[0] && skill[0] <= 419 ) {
    document.foMain.slSkill0.selectedIndex = skill[0];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[2] (0 ～ 419)
  msg += "スキル[2]   = " + skill[1];
  if ( 0 <= skill[1] && skill[1] <= 419 ) {
    document.foMain.slSkill1.selectedIndex = skill[1];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[3] (0 ～ 419)
  msg += "スキル[3]   = " + skill[2];
  if ( 0 <= skill[2] && skill[2] <= 419 ) {
    document.foMain.slSkill2.selectedIndex = skill[2];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[4] (0 ～ 419)
  msg += "スキル[4]   = " + skill[3];
  if ( 0 <= skill[3] && skill[3] <= 419 ) {
    document.foMain.slSkill3.selectedIndex = skill[3];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[5] (0 ～ 419)
  msg += "スキル[5]   = " + skill[4];
  if ( 0 <= skill[4] && skill[4] <= 419 ) {
    document.foMain.slSkill4.selectedIndex = skill[4];
  }
  else {
    msg += " (NG)";
  }
  msg += "\n";
  // スキル[6] (0 ～ 419)
  msg += "スキル[6]   = " + skill[5];
  if ( 0 <= skill[5] && skill[5] <= 419 ) {
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
  var src = fillZero( 4, "0")
          + fillZero( 9, eval(devil.devilID).toString(2))
          + fillZero( 7, eval(devil.lv).toString(2))
          + fillZero( 9, eval(devil.skill[5]).toString(2))
          + fillZero( 9, eval(devil.skill[4]).toString(2))
          + fillZero( 9, eval(devil.skill[3]).toString(2))
          + fillZero( 9, eval(devil.skill[2]).toString(2))
          + fillZero( 9, eval(devil.skill[1]).toString(2))
          + fillZero( 9, eval(devil.skill[0]).toString(2))
          + fillZero(32, eval(devil.exp).toString(2))
          + fillZero( 7, eval(devil.intBase).toString(2))
          + fillZero( 7, eval(devil.lucBase).toString(2))
          + fillZero( 7, eval(devil.agiBase).toString(2))
          + fillZero( 7, eval(devil.vitBase).toString(2))
          + fillZero( 7, eval(devil.strBase).toString(2))
          + fillZero( 7, eval(devil.int).toString(2))
          + fillZero( 7, eval(devil.luc).toString(2))
          + fillZero( 7, eval(devil.agi).toString(2))
          + fillZero( 7, eval(devil.vit).toString(2))
          + fillZero( 7, eval(devil.str).toString(2))
          + fillZero( 8, eval(currentPatternID).toString(2))
  ;
  var checksum = 0;
  
  // 1 バイト単位でマスク値と XOR およびチェックサム計算
  var srcBytes = new Array();
  for ( i = 0; i < 22; i++ ) {
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
  for ( i = 0; i < 22; i++ ) {
    dstBytes[indexMap[currentPatternID][i]] = srcBytes[i];
  }
  
  // 23 バイト目にマスク値をセット
  dstBytes[22] = currentPatternID;
  
  // 24 バイト目にチェックサムをセット
  dstBytes[23] = checksum;
  
  // バイト列をビット文字列に変換
  var dst = "";
  for ( i = 0; i < 24; i++ ) {
    dst += fillZero(8, eval(dstBytes[i]).toString(2))
  }
  
  // ビット列をパスワードに変換
  var password = "";
  for ( i = 0; i < 32; i++ ) {
    // 6 ビットずつ対応する文字に変換して連結する
    var charcode = parseInt(dst.substr(i * 6, 6), 2);
    password += letters.charAt(charcode);
    // 半分で改行
    if ( i == 15 ) {
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
  for ( i = value.length; i < place; i++ ) {
    value = "0" + value;
    if ( i < 0 ) {
      return;
    }
  }
  
  return value;
}//}}}

// 指定桁数での後方 0 埋め
function fillZeroAfter(place, value) {//{{{
  var i;
  for ( i = value.length; i < place; i++ ) {
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
  this.toString = function() {
    return this.name;
  }
  
  // この種族の文字列表現を返す。(詳細)
  this.toDetailString = function() {
    return this.name;
  }
  //}}}
}

// -------------------------------------------------------------------------------------------------
// スキルクラス
// -------------------------------------------------------------------------------------------------
function Skill(skillID, name,skillCost) {
  //{{{
  // スキル ID
  this.skillID = skillID;
  // 名称
  this.name = name;
  // コスト
  this.cost = skillCost;
  
  this.toStringCost =function () {
    return "cost:"+this.cost;
  }
  // この種族の文字列表現を返す。(簡易)
  this.toString = function() {
    return this.name;
  }
  
  // この種族の文字列表現を返す。(詳細)
  this.toDetailString = function() {
    return this.skillID + ":" + this.name;
  }
  //}}}
}

// -------------------------------------------------------------------------------------------------
// 悪魔クラス
// -------------------------------------------------------------------------------------------------
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
 *        {Boolean} showDefault 敵専用などエラーが出るモノの表示可否 敵専用の初期値はfalse
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
  this.showDefault = devil.showDefault;
  this.totalCost = 0;

  this.expMax = 2097151;

  /**
   * 最大コスト算出します。
   * this.skillが正しく設定されている必要があります。
   */ 
  this.calculateMaxSkillCost = function () {
    this.maxSkillCost = 0;//{{{
    for (var i=0,len = this.skill.length; i < len; i++) {
      var skillData = getSkill(this.skill[i]);
      // 初期所持スキルはコスト0として扱われるため、最大コスト算出より除外する
      if (!this.isDefaultSkill(skillData.skillID)) {
        this.maxSkillCost < skillData.cost 
        ? this.maxSkillCost = skillData.cost
        : this.maxSkillCost;
      }
    };
    return this.maxSkillCost;//}}}
  }
  
  /**
   * 最大経験値を算出します。
   */
  this.calculateEXPMax = function(){
    var expBaseScale,defference = this.lv - this.original.lv;//{{{
    
    if (defference < 0) {
      expBaseScale = expBaseScaleFactor[0];
    } else if(defference == 0){
      expBaseScale = expBaseScaleFactor[1];
    } else if(defference >= 1 && defference < 9){
      expBaseScale = expBaseScaleFactor[defference+1];
    } else if(defference >= 9 ){
      expBaseScale = expBaseScaleFactor[expBaseScaleFactor.length-1];
    }
    
    return this.expMax = Math.floor(expTable[this.lv] * expBaseScale -1);//}}}
 }

  /**
   * 悪魔が元々持っているスキルか判別します。
   * 
   * @param {String} skillID
   */
  this.isDefaultSkill = function(skillID) {
    defaultSkillList = this.original.skill;//{{{
    for (var i=0, len = defaultSkillList.length ; i< len ; i++) {
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
    
    var baseCost = Math.floor(Math.pow(statusCost,3) 
                              * this.devilCost % Math.pow(2,32) /1000);
    return this.totalCost = Math.floor(
      (this.maxSkillCost + baseCost + 1300)*3/4
    );
  }//}}}
  
  // この悪魔の複製を返す。
  this.clone = function() {
    //{{{
    var clone = new Devil(this);
    
    clone.attr    = this.attr.slice(0);
    clone.skill   = this.skill.slice(0);

    clone.original = this;
    
    return clone;
  }//}}}
  
  // この悪魔の文字列表現を返す。(簡易)
  this.toString = function() {
    //{{{
    var enemyExclusive = this.showDefault ? "" : "（？）"
    return "" + this.devilID + 
      ":[" + getGenus(this.genusID).toString() + "]" +
      this.name + enemyExclusive;
  }//}}}
  
  // この悪魔の文字列表現を返す。(詳細)
  this.toDetailString = function() {
    //{{{
    return this.toString();
  }//}}}
  
  // この悪魔の情報を返す。(簡易)
  this.getSimpleInformation = function() {
    //{{{
    var msg = "";
    
    msg += "【" + this.toString() + "】";
    
    msg += " COST:" + this.calculateCost();
    msg += " 最大スキルCOST:" + this.maxSkillCost;
    msg += "\n";
    
    msg += "■ステータス";
    msg += "\n";
    
    msg += "Lv:" + this.lv;
    msg += " 経験値:" + this.exp;
    msg += "\n";
    
    msg += "HP:" + this.HP +" MP:" + this.MP;
    msg += "\n";
    
    msg += "力:"  + this.str + "(" + this.strBase + ")";
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
    msg += "[1]:"  + getSkill(this.skill[0]);
    msg += " [2]:" + getSkill(this.skill[1]);
    msg += " [3]:" + getSkill(this.skill[2]);
    msg += "\n";
    msg += "[4]:"  + getSkill(this.skill[3]);
    msg += " [5]:" + getSkill(this.skill[4]);
    msg += " [6]:" + getSkill(this.skill[5]);
    msg += "\n";
    
    msg += "■パスワード : "
    msg += "\n";
    msg += generatePassword(this);
    
    return msg;
  }//}}}
  
  // この悪魔の情報を返す。(詳細)
  this.getDetailInformation = function() {
    return this.getSimpleInformation();//{{{
  }
  //}}}
  //}}}
}

// -------------------------------------------------------------------------------------------------
// パターンクラス
// -------------------------------------------------------------------------------------------------
function Pattern(charList, indexArray, xorbit) {
  this.indexArray = indexArray;//{{{
  this.b2cMap = charList.split(",");
  this.c2bMap = null;
  this.xorbit = xorbit;
  
  this.init = function() {
    this.c2bMap = new Array();
    var i;
    for ( i in this.b2cMap ) {
      this.c2bMap[this.b2cMap[i]] = i;
    }
  };
}
//}}}
