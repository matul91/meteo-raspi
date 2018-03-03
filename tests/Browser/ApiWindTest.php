<?php

namespace Tests\Browser;

use App\Wind;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ApiWindTest extends DuskTestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/winds');
        $response->assertStatus(200);
    }

    public function testExistLastRecord()
    {
        $lastRecordFromDatabase = Wind::getLastRecord();
        if($lastRecordFromDatabase != NULL){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Wind::getSettingMaxValuesPerGraph();
        if($maxRowsPerGraph != NULL AND $maxRowsPerGraph != 0 AND $maxRowsPerGraph > 0){
            $result = true;
        }else{
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph(){
        $dataFromDtabase = count(Wind::loadData());

        if($dataFromDtabase != 0 AND $dataFromDtabase > 0 AND $dataFromDtabase <= 100){
            $result = true;
        }else{
            $result = false;
        }

        $this->assertTrue($result);
    }
}
