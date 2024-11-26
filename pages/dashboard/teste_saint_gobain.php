<?php

/*
Problema
Você foi contratado para criar uma função que calcule a quantidade mínima de moedas necessárias para atingir um valor em dinheiro. A função deverá receber dois parâmetros:
 
Um valor inteiro representando a quantia de dinheiro.
Um array de inteiros representando as quantidades de moedas disponíveis.
A função deve retornar um array associativo onde a chave é a denominação da moeda e o valor é a quantidade de moedas dessa denominação utilizada para atingir o valor.
Caso não seja possível atingir o valor exato com as denominações fornecidas, a função deve retornar uma mensagem dizendo que não é possível

Ex; 11, [5, 2, 1] (exceção)
Ex; 20, [5, 5, 1] (sucesso)
*/

function verificaValorEmMoedas(int $valor, array $moedas): array
{
    $totalMoedas = array_sum($moedas);
    if ($totalMoedas !== $valor) {
        $valorDiferenca = $totalMoedas - $valor;

        $mensagem = "A quantidade de moedas excede o valor estipulado. Foi informado $valorDiferenca moeda(s) a mais";
        if ($valorDiferenca < 0 )
            $valorDiferenca = $valorDiferenca * -1;
            $mensagem = "Não é possivel chegar ao valor estipulado com as moedas. Falta(m) {$valorDiferenca} moeda(s)";

        throw new Exception($mensagem);
    }

    return ['total_moedas' => $totalMoedas];
}

var_dump(verificaValorEmMoedas(27, [5, 4, 18]));