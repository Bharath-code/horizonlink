package com.example.livelocationtrackertv

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.example.livelocationtrackertv.ui.theme.LiveLocationTrackerTvTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            LiveLocationTrackerTvTheme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colors.background) { AppNavigation() }
            }
        }
    }
}

@Composable
fun AppNavigation() {
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Pairing) }

    when (val screen = currentScreen) {
        is Screen.Pairing -> {
            CodeEntryScreen(onPairingSuccess = { userId -> currentScreen = Screen.Map(userId) })
        }
        is Screen.Map -> {
            MapScreen(userId = screen.userId)
        }
    }
}

sealed class Screen {
    object Pairing : Screen()
    data class Map(val userId: String) : Screen()
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    LiveLocationTrackerTvTheme { Greeting("Android") }
}
