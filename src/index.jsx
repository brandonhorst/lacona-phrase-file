/** @jsx createElement */
import {createElement, Phrase, Source} from 'lacona-phrase'
import {resolve} from 'path'
import fs from 'fs'
import thenify from 'thenify'

const readdir = thenify(fs.readdir)
const stat = thenify(fs.stat)

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

class Directory extends Source {
  onCreate () {
    this.replaceData({})

    if (this.props.directory == null) return

    readdir(this.props.directory).then(files => {
      const statPromises = _.map(files, file => Promise.all([file, stat(resolve(this.props.directory, file))]))
      return Promise.all(statPromises)
    }).then(stats => {
      return _.chain(stats)
        .indexBy(stat => stat[0])
        .mapValues(stat => {isDir: stat[1]})
        .value()
    }).then(files => {
      this.replaceData(files)
    })
  }
}

class TrueFile extends Phrase {
  describe () {
    if (this.props.directory == null) {
      return (
        <choice>
          <sequence>
            <literal text='/' />
            <TrueFile directory='/' />
          </sequence>
          <sequence>
            <literal text='~/' />
            <TrueFile directory={getUserHome()} />
          </sequence>
        </choice>
      )
    } else {
      const fileItems = this.files.map(({isDir}, file) => {
        const val = isDir ? `${file}/` : file
        return {text: val, value: val}
      })
      return <list items={fileItems} fuzzy={true} />
    }
  }

  source () {
    return {
      files: <Directory directory={this.props.directory} />
    }
  }
}

export default class File extends Phrase {
  describe () {
    return (
      <placeholder descriptor='file'>
        <TrueFile />
      </placeholder>
    )
  }
}

File.defaultProps = {

}
