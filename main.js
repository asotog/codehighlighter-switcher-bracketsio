/*jslint devel:true */
var define, brackets
    define(function (require, exports, module) {
        'use strict';

        /* Utils */
        var EditorManager = brackets.getModule("editor/EditorManager");
        var StatusBar = brackets.getModule("widgets/StatusBar");
        var CommandManager = brackets.getModule("command/CommandManager");
        var Menus = brackets.getModule("command/Menus");

        /* Status bar item creation */
        var statusComponentHtml = "<div id=\"code-highlighter-switcher\">Code Highlighter Switcher</div>";
        StatusBar.addIndicator("code-highlighter-switcher", $(statusComponentHtml), true, "", "", "status-indent");

        /* Languages */
        var languages = [{
            label: 'HTML',
            mode: 'htmlmixed'
        }, {
            label: 'PHP',
            mode: 'php'
        }, {
            label: 'Javascript',
            mode: 'javascript'
        }];

        var COMMAND_ = "highlightercommand."
        var showLanguagesOptionsMenu = Menus.registerContextMenu("code-highlighter-switcher-menu");

        /* Languages menu options */
        for (var i = 0; i < languages.length; i++) {
            (function (label, command, mode) {
                CommandManager.register(label, command, function () {
                    //this.setChecked(true)
                    EditorManager.getCurrentFullEditor()._codeMirror.setOption("mode", mode);
                });
                showLanguagesOptionsMenu.addMenuItem(command);
            })(languages[i].label, COMMAND_ + languages[i].mode, languages[i].mode);
        }

        /* Show context menu */
        $("#code-highlighter-switcher").on("contextmenu", function (e) {
            showLanguagesOptionsMenu.open(e);
        });
    });