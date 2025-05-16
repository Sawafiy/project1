node{
    git branch: 'master' , url: 'https://github.com/Sawafiy/project1.git'
    stage('build'){
        try{
            sh'echo "build stage" '
        }
        catch(Exception e){
            sh'echo "excrption found" '
            throw e
        }
    }
    stage('test'){
        if (env.BRANCH_NAME == "feat"){
            sh'echo "test stage" '
        }
        else{
            sh'echo "skip test stage" '
        }

    }

}