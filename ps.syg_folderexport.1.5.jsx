/*
トップのレイヤーフォルダ（レイヤーセット）ごとに画像を保存する

・保存ファイル名は「元ファイル名_レイヤーフォルダ名」となる。
・同じファイル名が存在する場合は上書きされる。
・不可視状態のフォルダは保存されない。

・フォルダ内のレイヤー、フォルダの状態は変更されない。
・第一階層に普通のレイヤーが表示されている場合は、それも表示したまま保存される。

・各フォーマットの保存オプションは「setSaveOption()」で行っているので、
　詳細な指定をしたい場合はそこで。

*/

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■変更項目
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ■出力先
// Windowsと Macintoshで記述方式が違うので、詳細は下記を参照。
// http://www.openspc2.org/book/PhotoshopCS/intro/009/index.html
var OUTPUT_DIR = 'C:\\';

// ■無視するフォルダ名の接頭辞
var THROW_NAME = '<>';

// ■保存形式
// PSD PNG JPG BMP から選ぶ。
var OUTPUT_FORMAT = "PNG";


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■グローバル変数・定数
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■

var __doc = activeDocument;
var __setList = new Array();	// 第一階層フォルダリスト
var __baseName;

// 書き出し開始
startOutput();


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■関数
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■

////////////////////////////////////////////////////////////////
// 書き出し開始
function startOutput(){
	var i;

	preferences.rulerUnits = Units.PIXELS;	// 単位をピクセルに
	__baseName = __doc.name.split('.')[0];	// ベースファイル名取得
	makeSetList();							// フォルダ一覧を作成

	// セット一覧から一個ずつ書き出す。
	for( i=0; i<__setList.length; i++ ){
		outputSet( __setList[i] );
	}
	// 可視状態に戻す
	for( i=0; i<__setList.length; i++ ){
		__setList[i].visible = true;
	}
}
////////////////////////////////////////////////////////////////
// セット一覧を作成
function makeSetList(){
	var i;
	var setName;

	for( i=0; i<__doc.layerSets.length; i++ ){
		// 不可視状態になっているものは無視
		if( __doc.layerSets[i].visible == false ) continue;
        
        // 無視接頭辞の付いている物は無視
        if( __doc.layerSets[i].name.indexOf(THROW_NAME) == 0 ) continue;

		__setList.push( __doc.layerSets[i] );
		__doc.layerSets[i].visible = false;	// 不可視にする
	}
}
////////////////////////////////////////////////////////////////
// セット単位で差分を出力
function outputSet( setObj ){
	var fileName = OUTPUT_DIR +__baseName + '_' +  setObj.name;

	setObj.visible = true;	// フォルダを表示
	outputImage( __doc, fileName );
	setObj.visible = false;	// フォルダを非表示
}
////////////////////////////////////////////////////////////////
// 画像出力
function outputImage( doc, fileName ){
	var opt;		// 保存オプション
	var fileObj;

	opt = setSaveOption( OUTPUT_FORMAT );
	fileObj = new File( fileName + opt.ext );
	doc.saveAs( fileObj, opt, true, Extension.LOWERCASE );
}
////////////////////////////////////////////////////////////////
// 保存オプション
// http://www.openspc2.org/book/PhotoshopCS2/
function setSaveOption( format ){
	var opt;

	switch( format ){
		case "PSD":
			opt = new PhotoshopSaveOptions();
			opt.alphaChannels = true;
			opt.embedColorProfile = true;
			opt.annotations = true;
			opt.layers = false;
			opt.spotColors = true;
			opt.ext = ".psd";
			break;
		case "PNG":
			opt = new PNGSaveOptions();
			opt.interlaced = false;
			opt.ext = ".png";
			break;
		case "BMP":
			opt = new BMPSaveOptions();
			opt.alphaChannels = false;
			opt.depth = BMPDepthType.TWENTYFOUR;
			opt.osType = OperatingSystem.WINDOWS;
			opt.rleCompression = false;
			opt.ext = ".bmp";
			break;
		case "JPG":
			opt = new JPEGSaveOptions();
			opt.embedColorProfile = true;
			opt.formatOptions = FormatOptions.STANDARDBASELINE;
			opt.matte = MatteType.BACKGROUND;
			opt.quality = 9;
			opt.ext = ".jpg";
			break;
	}

	return opt;
}


