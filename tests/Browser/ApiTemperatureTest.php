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
        if ($lastRecordFromDatabase != null) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Temperature::getSettingMaxValuesPerGraph();
        if ($maxRowsPerGraph != null and $maxRowsPerGraph != 0 and $maxRowsPerGraph > 0) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph()
    {
        $dataFromDtabase = count(Temperature::loadData());

        if ($dataFromDtabase != 0 and $dataFromDtabase > 0 and $dataFromDtabase <= 100) {
            $result = true;
        } else {
            $result = false;
        }

        $this->assertTrue($result);
    }
}
