import React, { useRef, useState } from 'react'
import { GameEngine } from "react-native-game-engine";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../Resources/Constants';
import Head from '../Components/Head/Head';
import Food from '../Components/Food/Food';
import Tail from '../Components/Tail/Tail';
import GameLoop from '../systems/GameLoop';

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8582719280960685/3307949149';

export const LoopGameScreen = () => {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [isGameRunning, setIsGameRunning] = useState(true);

  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.canvas}>

        <GameEngine
          ref={engine}
          style={{
            width: BoardSize,
            height: BoardSize,
            flex: null,
            backgroundColor: "#FFF",
            marginTop: 10,
          }}
          entities={{
            head: {
              position: [0, 0],
              size: Constants.CELL_SIZE,
              updateFrequency: 10,
              nextMove: 10,
              xspeed: 0,
              yspeed: 0,
              renderer: <Head />,
            },
            food: {
              position: [
                randomPositions(0, Constants.GRID_SIZE - 1),
                randomPositions(0, Constants.GRID_SIZE - 1),
              ],
              size: Constants.CELL_SIZE,
              renderer: <Food />,
            },
            tail: {
              size: Constants.CELL_SIZE,
              elements: [],
              renderer: <Tail />,
            },
          }}
          systems={[GameLoop]}
          running={isGameRunning}
          onEvent={(e) => {
            switch (e) {
              case "game-over":
                alert("Game over!");
                setIsGameRunning(false);
                return;
            }
          }}
        />
        <View style={styles.controlContainer}>

          <View style={styles.controllerRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => engine.current.dispatch("move-up")}
            >
              <View style={styles.controlBtn}>
                <Icon name="arrow-up-outline" size={50} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.controllerRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => engine.current.dispatch("move-left")}
            >
              <View style={styles.controlBtn}>
                <Icon name="arrow-back-outline" size={50} color="#000" />
              </View>
            </TouchableOpacity>

            <View style={[styles.controlBtn, { backgroundColor: null }]} />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => engine.current.dispatch("move-right")}
            >
              <View style={styles.controlBtn} >
                <Icon name="arrow-forward-outline" size={50} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.controllerRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => engine.current.dispatch("move-down")}
            >
              <View style={styles.controlBtn}>
                <Icon name="arrow-down-outline" size={50} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

        </View>

        {
          !isGameRunning && (
            <View
              style={{
                width: '100%',
                height: 120
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={resetGame}
                style={{
                  backgroundColor: "#feb308",
                  marginHorizontal: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  height: 50

                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Start New Game
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <BannerAd unitId={adUnitIdBanner} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#424242",
    alignItems: "center",
    justifyContent: "center",
  },
  controlContainer: {
    marginVertical: 20,
    backgroundColor: '#424242'
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    borderRadius: 10,
    backgroundColor: "#FFDA00",
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});