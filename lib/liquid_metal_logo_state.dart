import 'package:flutter/material.dart';

class LiquidMetalLogoState extends ChangeNotifier {
  LiquidMetalLogoState()
      : _type = LiquidMetalLogoType.twoMath,
        _background = LiquidMetalLogoBackground.metal;

  LiquidMetalLogoType _type;

  LiquidMetalLogoBackground _background;

  LiquidMetalLogoType get type => _type;

  set type(LiquidMetalLogoType value) {
    if (value == _type) {
      return;
    }

    _type = value;
    notifyListeners();
  }

  LiquidMetalLogoBackground get background => _background;

  set background(LiquidMetalLogoBackground value) {
    if (value == _background) {
      return;
    }

    _background = value;
    notifyListeners();
  }
}

enum LiquidMetalLogoType {
  twoMath(
    asset: 'assets/images/2m.png',
    icon: 'assets/images/svg/2m.svg',
    label: '2Math👑',
  ),
  ezzo(
    asset: 'assets/images/ezzo.png',
    icon: 'assets/images/svg/ezzo.svg',
    label: 'Ezzo',
  ),
  flutter(
    asset: 'assets/images/flutter.png',
    icon: 'assets/images/svg/flutter.svg',
    label: 'Flutter',
  ),
  google(
    asset: 'assets/images/google.png',
    icon: 'assets/images/svg/google.svg',
    label: 'Google',
  ),
  apple(
    asset: 'assets/images/apple.png',
    icon: 'assets/images/svg/apple.svg',
    label: 'Apple',
  ),
  firebase(
    asset: 'assets/images/firebase.png',
    icon: 'assets/images/svg/firebase.svg',
    label: 'Firebase',
  ),
  gemini(
    asset: 'assets/images/gemini.png',
    icon: 'assets/images/svg/gemini.svg',
    label: 'Gemini',
  ),
  ;

  final String asset;
  final String icon;
  final String label;

  const LiquidMetalLogoType({
    required this.asset,
    required this.icon,
    required this.label,
  });
}

enum LiquidMetalLogoBackground {
  metal,
  white,
  black;

  LinearGradient get gradient {
    final colors = switch (this) {
      metal => const [Color(0xFFEEEEEE), Color(0xFFB8B8B8)],
      white => [Colors.white, Colors.white],
      black => [Colors.black, Colors.black],
    };

    return LinearGradient(
      colors: colors,
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
    );
  }
}
