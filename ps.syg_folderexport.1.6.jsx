/*
現在表示されているレイヤーを、レイヤーごとに画像保存する。

・保存ファイル名は「元ファイル名_レイヤーフォルダ名_レイヤー名」となる。
・同じファイル名が存在する場合は上書きされる。
・レイヤーフォルダの中のレイヤーフォルダも再帰的に処理される。

・各フォーマットの保存オプションは「setSaveOption()」で行っているので、
　詳細な指定をしたい場合はそこで。

*/

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■変更項目
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ■出力先
// Windowsと Macintoshで記述方式が違うので、詳細は下記を参照。
// http://www.openspc2.org/book/PhotoshopCS/intro/009/index.html
var OUTPUT_DIR = 'c:\\';

// ■保存形式
// PSD PNG JPG BMP から選ぶ。
var OUTPUT_FORMAT = "PNG";


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■グローバル変数・定数
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var __doc = activeDocument;
var __layerList = new Array();	// レイヤー、レイヤーフォルダリスト
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

	// レイヤー一覧を作成
	makeLayerList( __doc, __baseName );

	// 一覧から一個ずつ書き出す。
	for( i=0; i<__layerList.length; i++ ){
		outputLayer( __layerList[i] );
	}
	// 可視状態に戻す
	for( i=0; i<__layerList.length; i++ ){
		__layerList[i].layer.visible = true;
	}
}
////////////////////////////////////////////////////////////////
// レイヤー一覧を作成
function makeLayerList( parent, name ){
	var i, q;
	var layerName;

	// 通常レイヤー一覧
	for( i=0; i<parent.artLayers.length; i++ ){
		// 通常のレイヤー以外は無視
		if( parent.artLayers[i].kind != LayerKind.NORMAL &&
		     parent.artLayers[i].kind != LayerKind.SMARTOBJECT &&
			parent.artLayers[i].kind != LayerKind.TEXT ){ continue; }

		// 可視状態のみ対象
		if( parent.artLayers[i].visible ){
			parent.artLayers[i].visible = false;
			layerName = name + "_" + parent.artLayers[i].name;
			__layerList.push({ "layer":parent.artLayers[i], "name":layerName });
		}
	}
	// レイヤーフォルダ
	/*
	for( i=0; i<parent.layerSets.length; i++ ){
		// 可視状態のフォルダを再帰的に処理
		if( parent.layerSets[i].visible ){
			layerName = name + "_" + parent.layerSets[i].name;
			makeLayerList( parent.layerSets[i], layerName );
		}
	}
	*/
}
////////////////////////////////////////////////////////////////
// レイヤー単位で出力
function outputLayer( obj ){
	var fileName = OUTPUT_DIR + obj.name;
	obj.layer.visible = true;	// レイヤーを表示
	outputImage( __doc, fileName );
	obj.layer.visible = false;	// レイヤーを非表示
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


