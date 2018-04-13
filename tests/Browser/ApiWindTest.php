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
        if ($lastRecordFromDatabase != null) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }

    public function testMaxRowsFromDatabase()
    {
        $maxRowsPerGraph = Wind::getSettingMaxValuesPerGraph();
        if ($maxRowsPerGraph != null and $maxRowsPerGraph != 0 and $maxRowsPerGraph > 0) {
            $result = true;
        } else {
            $result = false;
        }
        $this->assertTrue($result);
    }


    public function testMaxDataPerGraph()
    {
        $dataFromDtabase = count(Wind::loadData());

        if ($dataFromDtabase != 0 and $dataFromDtabase > 0 and $dataFromDtabase <= 100) {
            $result = true;
        } else {
            $result = false;
        }

        $this->assertTrue($result);
    }
}
