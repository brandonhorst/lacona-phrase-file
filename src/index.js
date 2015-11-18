import {Phrase} from 'lacona-phrase'

export default class File extends Phrase {
  describe () {
    return null
  }
}

// import _ from 'lodash'
// import {createElement, Phrase, Source} from 'lacona-phrase'
// import {resolve} from 'path'
// import fs from 'fs'
// import thenify from 'thenify'
//
// const readdir = thenify(fs.readdir)
// const stat = thenify(fs.stat)
// //
// // function getUserHome() {
// //   return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
// // }
//
// class Directory extends Source {
//   create () {
//     this.replaceData({})
//
//     readdir(this.props.directory).then(files => {
//       const statPromises = _.chain(files)
//         .reject(file => _.startsWith(file, '.'))
//         .reject(file => _.endsWith(file, '\r'))
//         .map(file => Promise.all([file, stat(resolve(this.props.directory, file))]))
//         .value()
//       return Promise.all(statPromises)
//     }).then(stats => {
//       return _.chain(stats)
//         .indexBy(stat => stat[0])
//         .mapValues(stat => ({isDir: stat[1].isDirectory()}))
//         .value()
//     }).then(files => {
//       this.replaceData(files)
//     })
//   }
// }
//
//
// class TrueFile extends Phrase {
//   getValue (result) {
//     if (result && result.dir) {
//       return result.dir.prefix + result.dir.suffix
//     } else if (result && result.file) {
//       return result.file
//     }
//   }
//
//   describe () {
//     const dirItems = _.chain(this.files)
//       .map(({isDir}, file) => {
//         if (!isDir) return
//         const val = `${file}/`
//         const newDir = resolve(this.props.directory, file)
//
//         return (
//           <sequence>
//             <literal text={val} value={val} id='prefix' />
//             <TrueFile directory={newDir} id='suffix'/>
//           </sequence>
//         )
//       })
//       .filter()
//       .value()
//
//     const fileItems = _.chain(this.files)
//       .map(({isDir}, file) => (
//         isDir ? null : {text: file, value: file}
//       ))
//       .filter()
//       .value()
//
//     return (
//       <choice>
//         <placeholder descriptor='directory' id='dir'>
//           <choice>
//             <literal text='' value={{prefix: '', suffix: ''}} />
//             {dirItems}
//           </choice>
//         </placeholder>
//         {fileItems.length > 0 ?
//           <placeholder descriptor='file' id='file'>
//             <list items={fileItems} />
//           </placeholder> :
//           null
//         }
//       </choice>
//     )
//   }
//
//   source () {
//     return {
//       files: <Directory directory={this.props.directory} />
//     }
//   }
// }
//
// export default class File extends Phrase {
//   getValue (result) {
//     if (result) {
//       return result.prefix + result.suffix
//     }
//   }
//
//   describe () {
//     return (
//       <placeholder descriptor='path' showForEmpty={true}>
//         <choice>
//           <sequence>
//             <literal text='/' value='/' id='prefix' />
//             <TrueFile directory='/' id='suffix' />
//           </sequence>
//           <sequence>
//             <literal text='~/' value={`${getUserHome()}/`} id='prefix' />
//             <TrueFile directory={`${getUserHome()}/`} id='suffix' />
//           </sequence>
//         </choice>
//       </placeholder>
//     )
//   }
// }
