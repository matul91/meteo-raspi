<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use App\Models\Weather\Records\Wind;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class ApiWindTest extends DuskTestCase
{
    use WithoutMiddleware;

    public function testApiWorking()
    {
        $response = $this->get('/winds');
        $response->assertStatus(200);
    }

    public function testExistLastRecord()
    {
        $lastRecordFromDatabase = Wind::last();
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

    public function testStore()
    {
        $this->withoutMiddleware(['permissions']);

        $testCases = [
            ['speed' => 40, 'direction' => "ENE", 'result' => 200],
            ['speed' => 30.286, 'direction' => "ENE", 'result' => 200],
            ['speed' => 30.286, 'direction' => "EEE", 'result' => 422],
            ['speed' => 90, 'direction' => "EEE", 'result' => 422],
            ['speed' => -128, 'direction' => "ENE", 'result' => 422],
            ['speed' => -128.6, 'direction' => "ENE", 'result' => 422]
        ];

        foreach ($testCases as $case) {
            $response = $this->json(
                'POST',
                '/winds',
                ['speed' => $case['speed'], 'direction' => $case['direction']]
            );
            $response->assertStatus($case['result']);
        }
    }
}
