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
        $lastRecordFromDatabase = Pressure::last();
        if ($lastRecordFromDatabase != null) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Pressure::getSettingMaxValuesPerGraph();
        if ($maxRowsPerGraph != null and $maxRowsPerGraph != 0 and $maxRowsPerGraph > 0) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph()
    {
        $dataFromDtabase = count(Pressure::loadData());

        if ($dataFromDtabase != 0 and $dataFromDtabase > 0 and $dataFromDtabase <= 100) {
            $result = true;
        } else {
            $result = false;
        }

        $this->assertTrue($result);
    }
}
