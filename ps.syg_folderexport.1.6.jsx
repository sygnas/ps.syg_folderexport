/*
���ݕ\������Ă��郌�C���[���A���C���[���Ƃɉ摜�ۑ�����B

�E�ۑ��t�@�C�����́u���t�@�C����_���C���[�t�H���_��_���C���[���v�ƂȂ�B
�E�����t�@�C���������݂���ꍇ�͏㏑�������B
�E���C���[�t�H���_�̒��̃��C���[�t�H���_���ċA�I�ɏ��������B

�E�e�t�H�[�}�b�g�̕ۑ��I�v�V�����́usetSaveOption()�v�ōs���Ă���̂ŁA
�@�ڍׂȎw����������ꍇ�͂����ŁB

*/

// ��������������������������������������������������������
// ���ύX����
// ��������������������������������������������������������

// ���o�͐�
// Windows�� Macintosh�ŋL�q�������Ⴄ�̂ŁA�ڍׂ͉��L���Q�ƁB
// http://www.openspc2.org/book/PhotoshopCS/intro/009/index.html
var OUTPUT_DIR = 'c:\\';

// ���ۑ��`��
// PSD PNG JPG BMP ����I�ԁB
var OUTPUT_FORMAT = "PNG";


// ��������������������������������������������������������
// ���O���[�o���ϐ��E�萔
// ��������������������������������������������������������
var __doc = activeDocument;
var __layerList = new Array();	// ���C���[�A���C���[�t�H���_���X�g
var __baseName;

// �����o���J�n
startOutput();


// ��������������������������������������������������������
// ���֐�
// ��������������������������������������������������������

////////////////////////////////////////////////////////////////
// �����o���J�n
function startOutput(){
	var i;

	preferences.rulerUnits = Units.PIXELS;	// �P�ʂ��s�N�Z����
	__baseName = __doc.name.split('.')[0];	// �x�[�X�t�@�C�����擾

	// ���C���[�ꗗ���쐬
	makeLayerList( __doc, __baseName );

	// �ꗗ�����������o���B
	for( i=0; i<__layerList.length; i++ ){
		outputLayer( __layerList[i] );
	}
	// ����Ԃɖ߂�
	for( i=0; i<__layerList.length; i++ ){
		__layerList[i].layer.visible = true;
	}
}
////////////////////////////////////////////////////////////////
// ���C���[�ꗗ���쐬
function makeLayerList( parent, name ){
	var i, q;
	var layerName;

	// �ʏ탌�C���[�ꗗ
	for( i=0; i<parent.artLayers.length; i++ ){
		// �ʏ�̃��C���[�ȊO�͖���
		if( parent.artLayers[i].kind != LayerKind.NORMAL &&
		     parent.artLayers[i].kind != LayerKind.SMARTOBJECT &&
			parent.artLayers[i].kind != LayerKind.TEXT ){ continue; }

		// ����Ԃ̂ݑΏ�
		if( parent.artLayers[i].visible ){
			parent.artLayers[i].visible = false;
			layerName = name + "_" + parent.artLayers[i].name;
			__layerList.push({ "layer":parent.artLayers[i], "name":layerName });
		}
	}
	// ���C���[�t�H���_
	/*
	for( i=0; i<parent.layerSets.length; i++ ){
		// ����Ԃ̃t�H���_���ċA�I�ɏ���
		if( parent.layerSets[i].visible ){
			layerName = name + "_" + parent.layerSets[i].name;
			makeLayerList( parent.layerSets[i], layerName );
		}
	}
	*/
}
////////////////////////////////////////////////////////////////
// ���C���[�P�ʂŏo��
function outputLayer( obj ){
	var fileName = OUTPUT_DIR + obj.name;
	obj.layer.visible = true;	// ���C���[��\��
	outputImage( __doc, fileName );
	obj.layer.visible = false;	// ���C���[���\��
}
////////////////////////////////////////////////////////////////
// �摜�o��
function outputImage( doc, fileName ){
	var opt;		// �ۑ��I�v�V����
	var fileObj;

	opt = setSaveOption( OUTPUT_FORMAT );
	fileObj = new File( fileName + opt.ext );
	doc.saveAs( fileObj, opt, true, Extension.LOWERCASE );
}
////////////////////////////////////////////////////////////////
// �ۑ��I�v�V����
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


