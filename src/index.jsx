/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import {resolve} from 'path'
import fs from 'fs'
import thenify from 'thenify'

const readdir = thenify(fs.readdir)
const stat = thenify(fs.stat)

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

class FileSystem extends Source {
  onCreate () {
    this.replaceData({})
  }

  readDir (dir) {
    if (this.data[dir]) return

    this.setData({[dir]: {}})

    readdir(dir).then(files => {
      const statPromises = _.map(files, file => Promise.all([file, stat(resolve(dir, file))]))
      return Promise.all(statPromises)
    }).then(stats => {
      return _.chain(stats)
        .indexBy(stat => stat[0])
        .mapValues(stat => {isDir: stat[1]})
        .value()
    }).then(files => {
      this.setData({[dir]: files})
    })
  }
}

export default class File extends Phrase {
  describe () {
    if (this.props.directory == null) {
      return (
        <choice>
          <sequence>
            <literal text='/' />
            <File directory='/' />
          </sequence>
          <sequence>
            <literal text='~/' />
            <File directory={getUserHome()} />
          </sequence>
        </choice>
      )
    } else {
    }
  }

  source () {
    return {
      files: <FileSystem />
    }
  }
}

File.defaultProps = {

}
