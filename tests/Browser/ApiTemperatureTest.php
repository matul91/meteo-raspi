<?php

namespace Tests\Browser;

use App\Temperature;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ApiTemperatureTest extends DuskTestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/temperatures');
        $response->assertStatus(200);
    }

    public function testExistLastRecord()
    {
        $lastRecordFromDatabase = Temperature::getLastRecord();
        if($lastRecordFromDatabase != NULL){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Temperature::getSettingMaxValuesPerGraph();
        if($maxRowsPerGraph != NULL AND $maxRowsPerGraph != 0 AND $maxRowsPerGraph > 0){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph(){
        $dataFromDtabase = count(Temperature::loadData());

        if($dataFromDtabase != 0 AND $dataFromDtabase > 0 AND $dataFromDtabase <= 100){
            $result = true;
        }else{
            $result = false;
        }

        $this->assertTrue($result);
    }

}
