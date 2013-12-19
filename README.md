#Photoshop Syg Showed Folder Export - 現在表示されているレイヤーフォルダーを、フォルダーごとに画像保存する。

##NAME
PS SygFolderExport

##VERSION

2013.06.18 ver1.5

* 公開

Photoshop CS3


##SYNOPSIS

表示されているレイヤーフォルダーをPNG形式に書き出すPhotoshopスクリプトです。

複数のフォルダー表示させた場合は、ひとつずつ保存していきます。

##DESCRIPTION

書き出したいレイヤーフォルダーを表示させた状態で、
Photoshopの［ファイル＞スクリプト＞参照］から本スクリプトを呼び出します。

##PARAMETER

書き出し場所は初期状態では「c:\」になっていますので、
スクリプトを書き換えてご利用ください。

``` javascript
// Windowsと Macintoshで記述方式が違うので、詳細は下記を参照。
// http://www.openspc2.org/book/PhotoshopCS/intro/009/index.html
var OUTPUT_DIR = 'c:\\';
```


##OLD VERSION


##AUTHOR
Hiroshi Fukuda <dada@sygnas.jp>  
http://sygnas.jp/

##LICENSE
ps.syg_folderexport

The MIT License

Copyright (c) 2011-2012 Hiroshi Fukuda, http://sygnas.jp/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
