<?php

namespace Tests\Browser;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Pressure;

class ApiPressuresTest extends TestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/pressures');
        $response->assertStatus(200);
    }

    public function testExistLastRecord()
    {
        $lastRecordFromDatabase = Pressure::getLastRecord();
        if($lastRecordFromDatabase != NULL){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Pressure::getSettingMaxValuesPerGraph();
        if($maxRowsPerGraph != NULL AND $maxRowsPerGraph != 0 AND $maxRowsPerGraph > 0){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph(){
        $dataFromDtabase = count(Pressure::loadData());

        if($dataFromDtabase != 0 AND $dataFromDtabase > 0 AND $dataFromDtabase <= 100){
            $result = true;
        }else{
            $result = false;
        }

        $this->assertTrue($result);
    }

}
