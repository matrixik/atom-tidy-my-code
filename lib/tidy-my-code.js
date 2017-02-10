'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidy-my-code:clean': () => this.clean()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  clean() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {

      const checkpoint = editor.createCheckpoint();

      const editorRange = editor.getBuffer().getRange();

      var toReplace = [
        [/{{[^\s]/, '{{ '],
      ];

      toReplace.forEach(function(item) {
        console.log("item[0]: " + item[0] + " item[1]:" + item[1]);
        const regex = new RegExp(item[0], 'gi');

        cleanedText = editor.backwardsScanInBufferRange(regex, editorRange, (obj) => {
          obj.replace(item[1]);
        });
      });

      editor.groupChangesSinceCheckpoint(checkpoint);
    }
  }

};
