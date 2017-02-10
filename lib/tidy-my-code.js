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
      let allText = editor.getText()
      this.cleanIt(allText).then((cleanedText) => {
        editor.setText(cleanedText)
      }).catch((error) => {
        atom.notifications.addWarning(error.reason)
      })
    }
  },

  cleanIt(text) {
    return new Promise((resolve, reject) => {
      let cleaned = text.split('').reverse().join('')
      resolve(cleaned)
    })
  }

};
