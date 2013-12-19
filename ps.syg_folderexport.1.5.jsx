/*
�g�b�v�̃��C���[�t�H���_�i���C���[�Z�b�g�j���Ƃɉ摜��ۑ�����

�E�ۑ��t�@�C�����́u���t�@�C����_���C���[�t�H���_���v�ƂȂ�B
�E�����t�@�C���������݂���ꍇ�͏㏑�������B
�E�s����Ԃ̃t�H���_�͕ۑ�����Ȃ��B

�E�t�H���_���̃��C���[�A�t�H���_�̏�Ԃ͕ύX����Ȃ��B
�E���K�w�ɕ��ʂ̃��C���[���\������Ă���ꍇ�́A������\�������܂ܕۑ������B

�E�e�t�H�[�}�b�g�̕ۑ��I�v�V�����́usetSaveOption()�v�ōs���Ă���̂ŁA
�@�ڍׂȎw����������ꍇ�͂����ŁB

*/

// ��������������������������������������������������������
// ���ύX����
// ��������������������������������������������������������

// ���o�͐�
// Windows�� Macintosh�ŋL�q�������Ⴄ�̂ŁA�ڍׂ͉��L���Q�ƁB
// http://www.openspc2.org/book/PhotoshopCS/intro/009/index.html
var OUTPUT_DIR = 'C:\\Users\\dada\\';

// ����������t�H���_���̐ړ���
var THROW_NAME = '<>';

// ���ۑ��`��
// PSD PNG JPG BMP ����I�ԁB
var OUTPUT_FORMAT = "PNG";


// ��������������������������������������������������������
// ���O���[�o���ϐ��E�萔
// ��������������������������������������������������������

var __doc = activeDocument;
var __setList = new Array();	// ���K�w�t�H���_���X�g
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
	makeSetList();							// �t�H���_�ꗗ���쐬

	// �Z�b�g�ꗗ�����������o���B
	for( i=0; i<__setList.length; i++ ){
		outputSet( __setList[i] );
	}
	// ����Ԃɖ߂�
	for( i=0; i<__setList.length; i++ ){
		__setList[i].visible = true;
	}
}
////////////////////////////////////////////////////////////////
// �Z�b�g�ꗗ���쐬
function makeSetList(){
	var i;
	var setName;

	for( i=0; i<__doc.layerSets.length; i++ ){
		// �s����ԂɂȂ��Ă�����͖̂���
		if( __doc.layerSets[i].visible == false ) continue;
        
        // �����ړ����̕t���Ă��镨�͖���
        if( __doc.layerSets[i].name.indexOf(THROW_NAME) == 0 ) continue;

		__setList.push( __doc.layerSets[i] );
		__doc.layerSets[i].visible = false;	// �s���ɂ���
	}
}
////////////////////////////////////////////////////////////////
// �Z�b�g�P�ʂō������o��
function outputSet( setObj ){
	var fileName = OUTPUT_DIR +__baseName + '_' +  setObj.name;

	setObj.visible = true;	// �t�H���_��\��
	outputImage( __doc, fileName );
	setObj.visible = false;	// �t�H���_���\��
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


