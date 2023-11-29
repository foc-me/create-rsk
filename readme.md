# @focme/create-rsk  

a initial cli for react ssr with koa2  

## command  

```shell
# create project in current dir
npm create @focme/rsk <project-name>
# or
# create project in specified dir
npm create @focme/rsk <project-path> <project-name>
```

## option  

```shell
npm create @focme/rsk <project-path> <project-name> --options
```

|option |describe          |
|-------|------------------|
|--lib  |create lib project|
|--ts   |use typescript    |
|--react|use react         |

**--lib**  

create `rollup` project with `--lib`  
or create `webpack` + `koa` project without `--lib`  

**--react**  

use react  
can not use with `--lib`

**--ts**  

use typescript  