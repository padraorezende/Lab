function global:lab.clonarRepositorioRelease() {

    $referencia = "master"

    $url = "https://github.com/iluwatar/java-design-patterns.git"

    $diretorioClone = "C:\Users\padra\Desktop\Lab\Lab02\clone\java-design-patterns"

     if (test-path $diretorioClone) {
        remove-item -force -recurse $diretorioClone
    }

    $_ErrorActionPreference = $ErrorActionPreference

    $ErrorActionPreference = 'Continue'

    git clone -b $referencia --depth 1 $url $diretorioClone | out-null

    $ErrorActionPreference = $_ErrorActionPreferenc
}

function global:lab.executarRunner() {

    $diretorioRunner = "C:\Users\padra\Desktop\Lab\Lab02\runner\Runner.jar"

    $diretorioClone = "C:\Users\padra\Desktop\Lab\Lab02\clone"

    $diretorioCsvGerado = "C:\Users\padra\Desktop\Lab\Lab02\csv\metrics\"


    java -jar $diretorioRunner $diretorioClone true 0 false $diretorioCsvGerado
}

function global:lab.rodarScript() {

    _echo "Fazendo clone do release do MonitorFreteRapido na branch/tag master"
    clone.clonarRepositorioRelease

    _echo "Fazendo clone do release do MonitorFreteRapido na branch/tag master"
    executar.runner

}   

