# Logseq プラグイン: New Line ショートカット 🦢

[English](https://github.com/YU000jp/logseq-plugin-blank-line) | [日本語](https://github.com/YU000jp/logseq-plugin-blank-line/blob/main/readme.ja.md)

1. 選択した行または、ページ内の先頭やその最後に、行をまとめて挿入します。
   > ブロック参照(行の引用)や埋め込みがあって、次の行に移動しにくい場合などに役立ちます。

[![最新リリースバージョン](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-blank-line)](https://github.com/YU000jp/logseq-plugin-blank-line/releases)
[![ライセンス](https://img.shields.io/github/license/YU000jp/logseq-plugin-blank-line?color=blue)](https://github.com/YU000jp/logseq-plugin-blank-line/LICENSE)
[![ダウンロード](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-blank-line/total.svg)](https://github.com/YU000jp/logseq-plugin-blank-line/releases)
  公開日: 2023/08/07

## 概要

### ショートカット一覧

行の追加
  - 編集中の行から、ショートカットキーでコマンドを実行します。
    1. 次の行を作成する
       - `Alt` と `Enter` 同時押し
    1. 複数の行を追加する（前）
       - `Ctrl` または `Cmd` と `Pg-Up` 同時押し
    1. 複数の行を追加する（次）
       - `Ctrl` または `Cmd` と `Pg-Down` 同時押し

  - ページにまとめて、行を追加する
    - ページ名を右クリックすると、メニューが出ます。次のいずれかの項目を選択してください。
       > 行の数は、プラグイン設定にその項目が存在します。
    1. メニュー項目 `🦢 先頭に、空白を追加 ⏫`
        > ページの先頭に、指定された数だけ行を追加します。
    1. メニュー項目 `🦢 最後に、空白を追加 ⏬`
        > ページの最後に、指定された数だけ行を追加します。

---

## はじめに

Logseq マーケットプレイスからインストール

   - 右上のツールバーで [`---`] をクリックして [`プラグイン`] を開きます。`マーケットプレイス` を選択し、検索フィールドに `Blank` と入力し、検索結果から選択してインストールします。

  ![画像](https://github.com/YU000jp/logseq-plugin-blank-line/assets/111847207/668cace9-8da2-4b90-91f7-4353f073c911)

### プラグイン設定

- 空行の挿入数（前）: 選択
  - `1`-`20`
- 空行の挿入数（次）: 選択
  - `1`-`20`
- ページメニューからの空行の挿入数: 選択
  - `1`-`30`
- 箇条書きメニューを有効にする: トグル
  - `true`
  - デフォルト: `false`

---

## ショーケース / 質問 / アイデア / ヘルプ

> [ディスカッション](https://github.com/YU000jp/logseq-plugin-blank-line/discussions) タブにアクセスして、質問やこれらの種類の情報を見つけて質問してください。

## クレジット

アイコン > [icooon-mono.com](https://icooon-mono.com/14658-%e3%82%b9%e3%83%af%e3%83%b3%e3%83%9c%e3%83%bc%e3%83%88%e3%81%ae%e7%84%a1%e6%96%99%e3%82%a4%e3%83%a9%e3%82%b9%e3%83%883/)

製作者 > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>